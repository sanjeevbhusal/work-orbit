import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { ActivitySubType, ActivityType } from '@prisma/client';

// {TODO: if smallImageUrl is present, ensure largeImageUrl is also present and vice versa}
const updateBoardFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Workspace Name must be atleast 2 characters')
    .max(50, 'Workspace Name cannot be more than 25 characters')
    .optional(),
  description: z
    .string()
    .max(5000, 'Description cannot be more than 5000 characters')
    .optional(),
  smallImageUrl: z.string().url().optional(),
  largeImageUrl: z.string().url().optional(),
});

interface Params {
  params: {
    boardId: string;
  };
}

export async function PUT(
  request: NextRequest,
  { params: { boardId } }: Params
) {
  const payload = await request.json();
  const parsedPayload = updateBoardFormSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return NextResponse.json(
      { error: parsedPayload.error.message },
      {
        status: 400,
      }
    );
  }

  // Verify board exists.
  const board = await db.board.findFirst({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return NextResponse.json(
      {
        error: 'Board not found',
      },
      {
        status: 404,
      }
    );
  }

  const { name, description, smallImageUrl, largeImageUrl } =
    parsedPayload.data;

  if (name || description) {
    if (name === board.name && description === board.description) {
      return NextResponse.json({ ok: true });
    }
    const { orgId } = auth();

    // Verify the new updated name doesnot colide with any other existing board within the same organization.
    const existingBoardWithSameName = await db.board.findFirst({
      where: {
        name,
        organizationId: orgId as string,
      },
    });

    if (existingBoardWithSameName) {
      return NextResponse.json(
        {
          error: 'Board with this name already exists',
        },
        {
          status: 409,
        }
      );
    }
  }

  // {TODO: ensure proper typescript typing}
  let updatedData: Record<any, any> = {};

  if (name) {
    updatedData.name = name;
  }
  if (description) {
    updatedData.description = description;
  }
  if (largeImageUrl) {
    updatedData.largeImageUrl = largeImageUrl;
  }
  if (smallImageUrl) {
    updatedData.smallImageUrl = smallImageUrl;
  }

  await db.board.update({
    where: {
      id: boardId,
    },
    data: updatedData,
  });

  const user = (await currentUser()) as User;

  const activity = await db.activity.create({
    data: {
      userId: user.id,
      subType: ActivitySubType.BOARD,
    },
  });

  const activityData: Record<any, any> = {
    activityId: activity.id,
    boardId,
    activityType: ActivityType.UPDATE,
  };

  if (name) {
    activityData.previousName = board.name;
    activityData.currentName = name;
  }

  if (smallImageUrl || largeImageUrl) {
    activityData.previousImageUrl = board.largeImageUrl;
    activityData.currentImageUrl = largeImageUrl;
  }

  // TODO: fix this type issue
  await db.boardActivity.create({
    data: activityData,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: NextRequest,
  { params: { boardId } }: Params
) {
  // Verify board exists.
  const board = await db.board.findFirst({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return NextResponse.json(
      {
        error: 'Board not found',
      },
      {
        status: 404,
      }
    );
  }

  await db.board.delete({
    where: {
      id: boardId,
    },
  });

  //TODO: Delete all the activities related to the board, column and cards.

  return NextResponse.json({ ok: true });
}

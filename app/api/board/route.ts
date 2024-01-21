import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { z } from 'zod';

import { db } from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs';
import { Clerk, User } from '@clerk/nextjs/server';
import { ActivitySubType, ActivityType } from '@prisma/client';

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Workspace Name must be atleast 2 characters')
    .max(50, 'Workspace Name cannot be more than 25 characters'),
  smallImageUrl: z.string(),
  largeImageUrl: z.string(),
});

async function POST(request: NextRequest) {
  const payload = await request.json();
  const parsedPayload = formSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return NextResponse.json(
      { error: parsedPayload.error.message },
      {
        status: 400,
      }
    );
  }

  const { name, smallImageUrl, largeImageUrl } = parsedPayload.data;

  const { orgId } = auth();

  const existingBoard = await db.board.findFirst({
    where: {
      name: name,
      organizationId: orgId as string,
    },
  });

  if (existingBoard) {
    return NextResponse.json(
      { error: 'Board with this name already exists' },
      {
        status: 409,
      }
    );
  }

  const board = await db.board.create({
    data: {
      name,
      organizationId: orgId as string,
      smallImageUrl: smallImageUrl,
      largeImageUrl: largeImageUrl,
    },
  });

  const user = (await currentUser()) as User;

  // once the board is created, also create the necessary activity log for this.
  const activity = await db.activity.create({
    data: {
      userId: user.id,
      subType: ActivitySubType.BOARD,
    },
  });
  await db.boardActivity.create({
    data: {
      activityId: activity.id,
      boardId: board.id,
      activityType: ActivityType.CREATE,
      currentName: board.name,
    },
  });

  return NextResponse.json({ data: board });
}

export { POST };

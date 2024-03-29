import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/lib/db';
import { User } from '@clerk/backend';
import { currentUser } from '@clerk/nextjs';
import { ActivitySubType, ActivityType } from '@prisma/client';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Column Name cannot be empty')
    .max(50, 'Column Name cannot be more than 30 characters'),
});

async function POST(request: NextRequest) {
  const boardId = request.nextUrl.searchParams.get('boardId');

  if (!boardId) {
    return NextResponse.json(
      {
        error: 'Board ID is required',
      },
      { status: 400 }
    );
  }

  const existingBoard = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!existingBoard) {
    return NextResponse.json(
      {
        error: 'Board does not exist',
      },
      { status: 404 }
    );
  }

  const payload = await request.json();
  const validatedPayload = formSchema.safeParse(payload);

  if (!validatedPayload.success) {
    return NextResponse.json(
      {
        error: validatedPayload.error,
      },
      { status: 400 }
    );
  }

  const { name } = validatedPayload.data;

  // calculate the last index column.
  const lastIndexColumn = await db.column.findFirst({
    where: {
      boardId,
    },
    orderBy: {
      index: 'desc',
    },
    select: {
      index: true,
    },
  });

  const columnIndex = lastIndexColumn ? lastIndexColumn.index + 1 : 0;

  const column = await db.column.create({
    data: {
      name,
      boardId,
      index: columnIndex,
    },
  });

  const user = (await currentUser()) as User;

  const activity = await db.activity.create({
    data: {
      userId: user.id,
      subType: ActivitySubType.COLUMN,
    },
  });

  await db.columnActivity.create({
    data: {
      activityId: activity.id,
      activityType: ActivityType.CREATE,
      columnId: column.id,
      currentName: column.name,
    },
  });

  return NextResponse.json({ ok: true });
}

export { POST };

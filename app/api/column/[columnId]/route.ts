import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { ActivitySubType, ActivityType } from '@prisma/client';

interface Params {
  params: {
    columnId: string;
  };
}

async function DELETE(request: NextRequest, { params: { columnId } }: Params) {
  await db.column.delete({
    where: {
      id: columnId,
    },
    include: {
      cards: true,
    },
  });

  return NextResponse.json({ ok: true });
}

const editColumnFormSchema = z.object({
  name: z.string().min(1, 'Column Name cannot be empty').max(50, 'Column Name cannot be more than 50 characters'),
  description: z.string().max(5000, 'Column Name cannot be more than 5000 characters').optional(),
});

async function PUT(request: NextRequest, { params: { columnId } }: Params) {
  const payload = await request.json();
  const parsedPayload = editColumnFormSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return NextResponse.json(
      { error: parsedPayload.error.message },
      {
        status: 400,
      },
    );
  }

  const existingColumn = await db.column.findUnique({
    where: {
      id: columnId,
    },
  });

  if (!existingColumn) {
    return NextResponse.json(
      { error: 'Column not found' },
      {
        status: 404,
      },
    );
  }

  const { name, description } = parsedPayload.data;

  await db.column.update({
    where: {
      id: columnId,
    },
    data: {
      name,
      description,
    },
  });

  //TODO: Add activity to the column.

  const user = (await currentUser()) as User;

  const activity = await db.activity.create({
    data: {
      userId: user.id,
      createdAt: new Date(),
      subType: ActivitySubType.COLUMN,
    },
  });

  await db.columnActivity.create({
    data: {
      activityId: activity.id,
      columnId,
      activityType: ActivityType.UPDATE,
      previousName: existingColumn.name,
      currentName: name,
    },
  });

  return NextResponse.json({ ok: true });
}

export { DELETE, PUT };

import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { ActivitySubType, ActivityType } from '@prisma/client';

interface Params {
  params: {
    columnId: string;
  };
}

export async function POST(
  request: NextRequest,
  { params: { columnId } }: Params
) {
  const column = await db.column.findUnique({
    where: {
      id: columnId,
    },
    include: {
      cards: true,
    },
  });

  if (!column) {
    return NextResponse.json({ error: 'Column not found' }, { status: 404 });
  }

  const lastColumnIndex = await db.column.findFirst({
    where: {
      boardId: column.boardId,
    },
    orderBy: {
      index: 'desc',
    },
    select: {
      index: true,
    },
  });

  const index = lastColumnIndex ? lastColumnIndex.index + 1 : 0;

  // create a new column with cards.
  const newColumn = await db.column.create({
    data: {
      boardId: column.boardId,
      name: `${column.name} - Copy`,
      description: `${column.description} - Copy`,
      index,
      cards: {
        createMany: {
          data: column.cards.map((card) => {
            return {
              name: card.name,
              index: card.index,
            };
          }),
        },
      },
    },
    include: {
      cards: true,
    },
  });

  const user = (await currentUser()) as User;

  // create activity for each card.
  newColumn.cards.forEach(async (card) => {
    const activity = await db.activity.create({
      data: {
        userId: user.id,
        subType: ActivitySubType.CARD,
      },
    });
    await db.cardActivity.create({
      data: {
        activityId: activity.id,
        activityType: ActivityType.CREATE,
        cardId: card.id,
        currentColumnId: newColumn.id,
      },
    });
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}

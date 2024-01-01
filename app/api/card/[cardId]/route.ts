import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { ActivitySubType, ActivityType } from '@prisma/client';

const formSchema = z.object({
  columnId: z.string(),
  index: z.number(),
});

interface Params {
  params: {
    cardId: string;
  };
}

async function POST(request: NextRequest, { params: { cardId } }: Params) {
  const payload = await request.json();
  const parsedPayload = formSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return NextResponse.json(
      { error: parsedPayload.error.message },
      {
        status: 400,
      },
    );
  }

  const existingCard = await db.card.findFirst({
    where: {
      id: cardId,
    },
  });

  if (!existingCard) {
    return NextResponse.json(
      {
        error: 'Card not found',
      },
      {
        status: 404,
      },
    );
  }

  if (existingCard.columnId === parsedPayload.data.columnId) {
    return NextResponse.json({ ok: true });
  }

  const { columnId, index } = parsedPayload.data;

  await db.card.update({
    where: {
      id: cardId,
    },
    data: {
      columnId,
      index,
    },
  });

  // Did this card moved into another column.
  // Current column id with the new one.
  const user = (await currentUser()) as User;

  const activity = await db.activity.create({
    data: {
      userId: user.id,
      createdAt: new Date(),
      subType: ActivitySubType.CARD,
    },
  });

  await db.cardActivity.create({
    data: {
      activityId: activity.id,
      activityType: ActivityType.MOVE,
      previousColumnId: existingCard.columnId,
      currentColumnId: columnId,
      cardId: existingCard.id,
    },
  });

  return NextResponse.json({ ok: true });
}

const updateFormSchema = z.object({
  name: z.string().min(1, 'Card Name cannot be empty').max(50, 'Card Name cannot be more than 50 characters'),
});

async function PUT(request: NextRequest, { params: { cardId } }: Params) {
  const payload = await request.json();
  const parsedPayload = updateFormSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return NextResponse.json(
      { error: parsedPayload.error.message },
      {
        status: 400,
      },
    );
  }

  const { name } = parsedPayload.data;

  const existingCard = await db.card.findUnique({
    where: {
      id: cardId,
    },
  });

  if (!existingCard) {
    return NextResponse.json(
      { error: 'Card not found' },
      {
        status: 404,
      },
    );
  }

  await db.card.update({
    where: {
      id: cardId,
    },
    data: {
      name,
    },
  });

  return NextResponse.json({ ok: true });
}

async function DELETE(request: NextRequest, { params: { cardId } }: Params) {
  const existingCard = await db.card.findUnique({
    where: {
      id: cardId,
    },
  });

  if (!existingCard) {
    return NextResponse.json(
      { error: 'Card not found' },
      {
        status: 404,
      },
    );
  }

  await db.card.delete({
    where: {
      id: cardId,
    },
  });

  return NextResponse.json({ ok: true });
}

export { DELETE,POST, PUT };

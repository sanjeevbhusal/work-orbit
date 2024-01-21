import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { ActivitySubType, ActivityType } from '@prisma/client';

const formSchema = z.object({
  destinationColumnId: z.string(),
  destinationCardIndex: z.number(),
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
      }
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
      }
    );
  }

  const { destinationColumnId, destinationCardIndex } = parsedPayload.data;

  // Reorder the cards below or above. Reordeing above isn't possible. So, reorder at the bottom.

  // Cases: Card dropped at index 2 from the frontend. The Card should now go to the new column and be removed from previous column. Cards from new column has to also be adjust for index change and cards from previous column has to be adjusted for index change.

  await db.card.update({
    where: {
      id: cardId,
    },
    data: {
      columnId: destinationColumnId,
      index: destinationCardIndex,
    },
  });

  const sourceColumnSameAsDestinationColumn =
    existingCard.columnId === destinationColumnId;

  if (!sourceColumnSameAsDestinationColumn) {
    // Update the index of cards in the destination column.
    const destinationColumnCards = await db.card.findMany({
      where: {
        columnId: destinationColumnId,
        index: {
          gte: destinationCardIndex,
        },
        id: {
          not: cardId,
        },
      },
    });

    destinationColumnCards.forEach(async (card) => {
      await db.card.update({
        where: {
          id: card.id,
        },
        data: {
          index: card.index + 1,
        },
      });
    });

    // Update the index of cards in the source column.

    const sourceColumnCards = await db.card.findMany({
      where: {
        columnId: existingCard.columnId,
        index: {
          gt: existingCard.index,
        },
      },
    });

    sourceColumnCards.forEach(async (card) => {
      await db.card.update({
        where: {
          id: card.id,
        },
        data: {
          index: card.index - 1,
        },
      });
    });
  } else {
    // Update the index of cards in the source column.

    if (destinationCardIndex > existingCard.index) {
      const sourceColumnCards = await db.card.findMany({
        where: {
          columnId: existingCard.columnId,
          index: {
            lte: destinationCardIndex,
            gt: existingCard.index,
          },
          id: {
            not: cardId,
          },
        },
      });

      sourceColumnCards.forEach(async (card) => {
        await db.card.update({
          where: {
            id: card.id,
          },
          data: {
            index: card.index - 1,
          },
        });
      });
    } else {
      const sourceColumnCards = await db.card.findMany({
        where: {
          columnId: existingCard.columnId,
          index: {
            gte: destinationCardIndex,
            lt: existingCard.index,
          },
          id: {
            not: cardId,
          },
        },
      });

      sourceColumnCards.forEach(async (card) => {
        await db.card.update({
          where: {
            id: card.id,
          },
          data: {
            index: card.index + 1,
          },
        });
      });
    }
  }

  const user = (await currentUser()) as User;

  const activity = await db.activity.create({
    data: {
      userId: user.id,
      subType: ActivitySubType.CARD,
    },
  });

  await db.cardActivity.create({
    data: {
      activityId: activity.id,
      activityType: ActivityType.MOVE,
      previousColumnId: existingCard.columnId,
      currentColumnId: destinationColumnId,
      cardId: existingCard.id,
    },
  });

  return NextResponse.json({ ok: true });
}

const updateFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Card Name cannot be empty')
    .max(50, 'Card Name cannot be more than 50 characters'),
});

async function PUT(request: NextRequest, { params: { cardId } }: Params) {
  const payload = await request.json();
  const parsedPayload = updateFormSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return NextResponse.json(
      { error: parsedPayload.error.message },
      {
        status: 400,
      }
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
      }
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
      }
    );
  }

  await db.card.delete({
    where: {
      id: cardId,
    },
  });

  return NextResponse.json({ ok: true });
}

export { DELETE, POST, PUT };

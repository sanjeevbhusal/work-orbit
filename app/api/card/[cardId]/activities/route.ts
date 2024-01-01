import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';

interface Params {
  params: {
    cardId: string;
  };
}

export async function GET(
  request: NextRequest,
  { params: { cardId } }: Params
) {
  const activities = await db.cardActivity.findMany({
    where: {
      cardId: cardId,
    },
    include: {
      Activity: true,
      currentColumn: true,
      previousColumn: true,
    },
    orderBy: {
      Activity: {
        createdAt: 'desc',
      },
    },
  });
  return NextResponse.json({ data: activities });
}

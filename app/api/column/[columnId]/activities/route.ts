import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';

interface Params {
  params: {
    columnId: string;
  };
}

export async function GET(request: NextRequest, { params: { columnId } }: Params) {
  const activities = await db.columnActivity.findMany({
    where: {
      columnId: columnId,
    },
    include: {
      Activity: true,
    },
  });
  return NextResponse.json({ data: activities });
}

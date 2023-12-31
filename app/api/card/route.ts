import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { ActivitySubType, ActivityType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Card Name cannot be empty")
    .max(50, "Card Name cannot be more than 50 characters"),
});

async function POST(request: NextRequest) {
  const columnId = request.nextUrl.searchParams.get("columnId");

  if (!columnId) {
    return NextResponse.json(
      {
        error: "Column ID is required",
      },
      { status: 400 }
    );
  }

  const existingColumn = await db.column.findUnique({
    where: {
      id: columnId,
    },
    select: {
      cards: true,
    },
  });

  if (!existingColumn) {
    return NextResponse.json(
      {
        error: "Column does not exist",
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

  const card = await db.card.create({
    data: {
      name,
      columnId,
      index: existingColumn.cards.length + 1,
    },
  });

  // add a activity for this card.

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
      cardId: card.id,
      activityType: ActivityType.MOVE,
      currentColumnId: columnId,
    },
  });

  return NextResponse.json({ ok: true });
}

export { POST };

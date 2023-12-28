import { db } from "@/lib/db";
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

  await db.card.create({
    data: {
      name,
      columnId,
      index: existingColumn.cards.length + 1,
    },
  });

  return NextResponse.json({ ok: true });
}

export { POST };

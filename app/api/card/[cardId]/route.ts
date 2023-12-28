import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
      }
    );
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

  return NextResponse.json({ ok: true });
}

const updateFormSchema = z.object({
  name: z
    .string()
    .min(1, "Card Name cannot be empty")
    .max(50, "Card Name cannot be more than 50 characters"),
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
      { error: "Card not found" },
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
      { error: "Card not found" },
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

export { POST, PUT, DELETE };

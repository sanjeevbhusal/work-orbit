import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Column Name cannot be empty")
    .max(50, "Column Name cannot be more than 30 characters"),
});

async function POST(request: NextRequest) {
  const boardId = request.nextUrl.searchParams.get("boardId");

  if (!boardId) {
    return NextResponse.json(
      {
        error: "Board ID is required",
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
        error: "Board does not exist",
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

  await db.column.create({
    data: {
      name,
      boardId,
    },
  });

  return NextResponse.json({ ok: true });
}

export { POST };

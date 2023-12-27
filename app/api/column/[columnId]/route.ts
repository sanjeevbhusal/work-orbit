import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
      tasks: true,
    },
  });

  return NextResponse.json({ ok: true });
}

const editColumnFormSchema = z.object({
  name: z
    .string()
    .min(1, "Column Name cannot be empty")
    .max(50, "Column Name cannot be more than 50 characters"),
});

async function PUT(request: NextRequest, { params: { columnId } }: Params) {
  const payload = await request.json();
  const parsedPayload = editColumnFormSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return NextResponse.json(
      { error: parsedPayload.error.message },
      {
        status: 400,
      }
    );
  }

  const { name } = parsedPayload.data;

  const existingColumn = await db.column.findUnique({
    where: {
      id: columnId,
    },
  });

  if (!existingColumn) {
    return NextResponse.json(
      { error: "Column not found" },
      {
        status: 404,
      }
    );
  }

  await db.column.update({
    where: {
      id: columnId,
    },
    data: {
      name,
    },
  });

  return NextResponse.json({ ok: true });
}

export { DELETE, PUT };

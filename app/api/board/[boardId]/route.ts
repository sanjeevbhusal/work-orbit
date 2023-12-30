import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateBoardFormSchema = z.object({
  name: z
    .string()
    .min(2, "Workspace Name must be atleast 2 characters")
    .max(50, "Workspace Name cannot be more than 25 characters"),
  description: z
    .string()
    .max(5000, "Description cannot be more than 5000 characters")
    .optional(),
});

interface Params {
  params: {
    boardId: string;
  };
}

export async function PUT(
  request: NextRequest,
  { params: { boardId } }: Params
) {
  const payload = await request.json();
  const parsedPayload = updateBoardFormSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return NextResponse.json(
      { error: parsedPayload.error.message },
      {
        status: 400,
      }
    );
  }

  // Verify board exists.

  const board = await db.board.findFirst({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return NextResponse.json(
      {
        error: "Board not found",
      },
      {
        status: 404,
      }
    );
  }

  const { name, description } = parsedPayload.data;
  const { orgId } = auth();

  if (name !== board.name) {
    // Verify the new updated name doesnot colide with any other existing board within the same organization.
    const existingBoardWithSameName = await db.board.findFirst({
      where: {
        name,
        organizationId: orgId as string,
      },
    });

    if (existingBoardWithSameName) {
      return NextResponse.json(
        {
          error: "Board with this name already exists",
        },
        {
          status: 409,
        }
      );
    }
  }

  await db.board.update({
    where: {
      id: boardId,
    },
    data: {
      name,
      description,
    },
  });

  return NextResponse.json({ ok: true });
}
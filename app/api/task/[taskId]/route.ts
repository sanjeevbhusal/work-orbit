import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { Clerk, User } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  columnId: z.string(),
  index: z.number(),
});

interface Params {
  params: {
    taskId: string;
  };
}

async function POST(request: NextRequest, { params: { taskId } }: Params) {
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

  await db.task.update({
    where: {
      id: taskId,
    },
    data: {
      columnId,
      index,
    },
  });

  return NextResponse.json({ ok: true });
}

export { POST };

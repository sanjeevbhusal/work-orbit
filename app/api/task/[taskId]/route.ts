import { db } from "@/lib/db";
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

const updateFormSchema = z.object({
  name: z
    .string()
    .min(1, "Task Name cannot be empty")
    .max(50, "Task Name cannot be more than 50 characters"),
});

async function PUT(request: NextRequest, { params: { taskId } }: Params) {
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

  const existingTask = await db.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!existingTask) {
    return NextResponse.json(
      { error: "Task not found" },
      {
        status: 404,
      }
    );
  }

  await db.task.update({
    where: {
      id: taskId,
    },
    data: {
      task: name,
    },
  });

  return NextResponse.json({ ok: true });
}

export { POST, PUT };

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { Clerk, User } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Workspace Name must be atleast 2 characters")
    .max(50, "Workspace Name cannot be more than 25 characters"),
});

async function POST(request: NextRequest) {
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

  const { name } = parsedPayload.data;

  const { orgId } = auth();

  const existingBoard = await db.board.findFirst({
    where: {
      name: name,
      organizationId: orgId as string,
    },
  });

  if (existingBoard) {
    return NextResponse.json(
      { error: "Board with this name already exists" },
      {
        status: 409,
      }
    );
  }

  const UNSPLASH_CLIENT_ID = process.env.UNSPLASH_CLIENT_ID;

  const response = await axios.get(
    `https://api.unsplash.com/photos/random?query=nature&client_id=${UNSPLASH_CLIENT_ID}`
  );

  await db.board.create({
    data: {
      name,
      organizationId: orgId as string,
      imageUrl: response.data.urls.regular,
    },
  });

  return NextResponse.json({ ok: true });
}

export { POST };

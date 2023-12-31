import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  text: z.string(),
  cardId: z.string(),
});

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const parsedPayload = formSchema.safeParse(payload);
  if (!parsedPayload.success) {
    return NextResponse.json(
      {
        error: parsedPayload.error.message,
      },
      {
        status: 400,
      }
    );
  }
  const { text, cardId } = parsedPayload.data;

  const existingCard = await db.card.findFirst({
    where: {
      id: cardId,
    },
  });

  if (!existingCard) {
    return NextResponse.json(
      {
        error: "Card not found",
      },
      {
        status: 404,
      }
    );
  }

  const user = (await currentUser()) as User;

  await db.comment.create({
    data: {
      cardId: cardId,
      userId: user.id,
      text,
    },
  });

  return NextResponse.json({ ok: true });
}

// localhost:3000/api/comment?cardId=dkflajksdlfjksaldfjklsdfjadslkf

export async function GET(request: NextRequest) {
  const cardId = request.nextUrl.searchParams.get("cardId");
  if (!cardId) {
    return NextResponse.json(
      {
        error: "Card Id not provided in searchParams",
      },
      {
        status: 400,
      }
    );
  }

  const existingCard = await db.card.findFirst({
    where: {
      id: cardId,
    },
  });

  if (!existingCard) {
    return NextResponse.json(
      {
        error: "Card not found",
      },
      {
        status: 404,
      }
    );
  }

  const comments = await db.comment.findMany({
    where: {
      cardId,
    },
  });

  return NextResponse.json({ data: comments });
}

import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

import { db } from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs';

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Workspace Name must be atleast 2 characters')
    .max(50, 'Workspace Name cannot be more than 25 characters'),
});

async function POST(request: NextRequest) {
  const payload = await request.json();

  const parsedPayload = formSchema.safeParse(payload);
  if (!parsedPayload.success) {
    return NextResponse.json(
      { error: parsedPayload.error.message },
      {
        status: 400,
      },
    );
  }

  const { name } = parsedPayload.data;

  const { userId, orgId } = auth();

  const workspace = await db.workspace.create({
    data: {
      name,
    },
  });

  return NextResponse.json(
    {
      data: workspace,
    },
    {
      status: 201,
    },
  );
}

export { POST };

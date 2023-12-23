import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

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

export { DELETE };

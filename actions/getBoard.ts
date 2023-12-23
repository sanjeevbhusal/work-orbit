import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

async function getBoard(boardId: string) {
  const { orgId } = auth();
  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });
  return board;
}

export { getBoard };

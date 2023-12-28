import { db } from "@/lib/db";

async function getBoard(boardId: string) {
  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
    include: {
      columns: {
        include: {
          cards: true,
        },
      },
    },
  });
  return board;
}

export { getBoard };

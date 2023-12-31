import { db } from "@/lib/db";

async function getBoardActivity(boardId: string) {
  return db.boardActivity.findMany({
    where: {
      boardId,
    },
    include: {
      Activity: {
        include: {},
      },
    },
  });
}

export { getBoardActivity };

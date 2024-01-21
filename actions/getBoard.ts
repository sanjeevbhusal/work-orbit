import { db } from '@/lib/db';

async function getBoard(boardId: string) {
  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
    include: {
      columns: {
        include: {
          cards: {
            orderBy: {
              index: 'asc',
            },
          },
        },
        orderBy: {
          index: 'asc',
        },
      },
    },
  });
  return board;
}

export { getBoard };

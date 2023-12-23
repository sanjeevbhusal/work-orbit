import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

async function getBoards() {
  const { orgId } = auth();
  const boards = await db.board.findMany({
    where: {
      organizationId: orgId as string,
    },
  });
  return boards;
}

export { getBoards };

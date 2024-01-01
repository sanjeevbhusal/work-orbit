import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';

async function getWorkspaces() {
  const user = await currentUser();

  return await db.workspace.findMany({
    where: {
      ownerId: user!.id,
    },
  });
}

export { getWorkspaces };

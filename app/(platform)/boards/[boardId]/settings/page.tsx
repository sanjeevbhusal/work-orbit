import { getBoard } from '@/actions/getBoard';
import { BoardWithColumnAndCards } from '@/lib/types';

import { Settings } from './_components/settings';

interface SettingsPageProps {
  params: {
    boardId: string;
  };
}

export default async function SettingsPage({ params: { boardId } }: SettingsPageProps) {
  const board = (await getBoard(boardId)) as BoardWithColumnAndCards;
  return <Settings board={board} />;
}

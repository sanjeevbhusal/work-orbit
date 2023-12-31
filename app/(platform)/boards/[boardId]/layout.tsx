import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getBoard } from '@/actions/getBoard';
import { getBoards } from '@/actions/getBoards';
import { InvalidPath } from '@/components/InvalidPath';

import { NavBar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';

interface BoardLayoutProps {
  params: {
    boardId: string;
  };
  children: React.ReactNode;
}

export async function generateMetadata({
  params: { boardId },
}: BoardLayoutProps): Promise<Metadata> {
  const board = await getBoard(boardId);

  return {
    title: board?.name || 'Board',
  };
}

export default async function BoardLayout({
  children,
  params,
}: BoardLayoutProps) {
  const board = await getBoard(params.boardId);
  const allBoards = await getBoards();

  if (!board) {
    return <InvalidPath />;
  }

  return (
    <div className="h-screen">
      <NavBar />
      <div className="mx-auto h-[calc(100%-65px)] flex">
        <Sidebar
          currentBoard={board}
          otherBoards={allBoards.filter((b) => b.id !== board.id)}
        />
        {children}
      </div>
    </div>
  );
}

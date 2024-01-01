import Image from 'next/image';

import { getBoard } from '@/actions/getBoard';
import { PageHeading } from '@/components/page-heading';
import { BoardWithColumnAndCards } from '@/lib/types';

import { Board } from './_components/Board';

interface Props {
  params: {
    boardId: string;
  };
}

export default async function Page({ params: { boardId } }: Props) {
  const board = (await getBoard(boardId)) as BoardWithColumnAndCards;

  return (
    <div className="relative basis-96 grow overflow-x-auto">
      <div className="text-white py-2 bg-black/50 px-4">
        <PageHeading>{board.name}</PageHeading>
      </div>

      <Image src={board.largeImageUrl} alt="nature image" fill className="z-[-1]" />
      <Board board={board} />
    </div>
  );
}

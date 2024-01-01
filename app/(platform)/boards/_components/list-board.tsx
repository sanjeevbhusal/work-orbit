import Image from 'next/image';
import Link from 'next/link';

import { Board } from '@prisma/client';

interface ListBoardProps {
  boards: Board[];
}

function ListBoard({ boards }: ListBoardProps) {
  return boards.length === 0 ? (
    <p className="mt-2 text-sm">You donot have any boards yet. Please create a new board</p>
  ) : (
    <div className="flex gap-8 flex-wrap">
      {boards.map((board) => (
        <Link
          href={`/boards/${board.id}`}
          key={board.id}
          className="w-[100%] md:w-[calc(50%-16px)] lg:w-[calc(33.33%-21.33px)] h-32 relative flex items-center justify-center font-bold rounded-lg cursor-pointer"
        >
          <p className="absolute z-40 text-white">{board.name}</p>

          <Image src={board.smallImageUrl} alt="nature picture" fill className="rounded-lg" />
        </Link>
      ))}
    </div>
  );
}

export { ListBoard };

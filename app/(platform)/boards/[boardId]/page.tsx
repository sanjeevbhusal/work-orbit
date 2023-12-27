import { getBoard } from "@/actions/getBoard";

import Image from "next/image";
import { Board } from "./_components/Board";
import { BoardWithColumnAndTasks } from "@/lib/types";

interface Props {
  params: {
    boardId: string;
  };
}

export default async function Page({ params: { boardId } }: Props) {
  const board = (await getBoard(boardId)) as BoardWithColumnAndTasks;

  return (
    <div className="relative basis-96 grow overflow-x-auto">
      <div className="text-white py-2 bg-black/50 px-4">
        <p className="text-lg font-bold">{board.name}</p>
      </div>

      <Image src={board.imageUrl} alt="nature image" fill className="z-[-1]" />
      <Board board={board} />
    </div>
  );
}

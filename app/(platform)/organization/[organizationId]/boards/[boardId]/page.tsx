import { getBoard } from "@/actions/getBoard";
import { InvalidPath } from "@/components/InvalidPath";
import Image from "next/image";
import { Board } from "./_components/Board";

interface Props {
  params: {
    boardId: string;
  };
}

export default async function Page({ params: { boardId } }: Props) {
  const board = await getBoard(boardId);

  if (!board) {
    return <InvalidPath />;
  }

  return (
    <div className="mx-4 h-[calc(100vh-65px)]">
      <div className="mx-auto max-w-7xl relative h-full">
        <div className="text-white py-2 bg-black/50 px-4">
          <p className="text-lg font-bold">{board.name}</p>
        </div>

        <Image
          src={board.imageUrl}
          alt="nature image"
          fill
          className="z-[-1]"
        />
        <Board board={board} />
      </div>
    </div>
  );
}

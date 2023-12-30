import { getBoard } from "@/actions/getBoard";
import { NavBar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { getBoards } from "@/actions/getBoards";
import { InvalidPath } from "@/components/InvalidPath";

interface BoardLayoutProps {
  params: {
    boardId: string;
  };
  children: React.ReactNode;
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
    <div className="h-full">
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

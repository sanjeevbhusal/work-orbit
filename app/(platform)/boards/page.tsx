import { CreateBoard } from "./_components/create-board";
import { getBoards } from "@/actions/getBoards";
import Link from "next/link";

import Image from "next/image";
import { getImages } from "@/actions/getImages";
import { NavBar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

export default async function OrganizationPage() {
  const boards = await getBoards();
  const images = await getImages();

  return (
    <div className="h-full">
      <NavBar />
      <div className="px-4 h-[calc(100%-65px)] mx-auto max-w-7xl flex">
        <Sidebar />
        <div className="grow py-4 pl-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Your Boards</h1>
            <CreateBoard images={images} />
          </div>
          <div className="mt-4 flex gap-8 flex-wrap">
            {boards.length === 0 ? (
              <p className="mt-2 text-sm">
                You donot have any boards yet. Please create a new board
              </p>
            ) : (
              boards.map((board) => (
                <Link
                  href={`/boards/${board.id}`}
                  key={board.id}
                  className="w-[242.5px] lg:w-[232px] xl:w-[320px] h-32 flex items-center justify-center font-bold rounded-lg cursor-pointer grow relative"
                >
                  <p className="absolute z-40 text-white">{board.name}</p>

                  <Image
                    src={board.imageUrl}
                    alt="nature picture"
                    fill
                    className="rounded-lg "
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

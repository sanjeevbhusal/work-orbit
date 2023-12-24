import { Sidebar } from "./_components/sidebar";

import { CreateBoard } from "./_components/create-board";
import { getBoards } from "@/actions/getBoards";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { getImages } from "@/actions/getImages";

export default async function OrganizationPage() {
  const boards = await getBoards();
  const images = await getImages("nature");

  const { orgId } = auth();

  return (
    <div className="flex h-full px-4 mx-auto max-w-7xl xl:p-0">
      <Sidebar />
      <div className="pt-4 pl-4 grow">
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
                href={`/organization/${orgId}/boards/${board.id}`}
                key={board.id}
                className="w-64 h-32 flex items-center justify-center font-bold rounded-lg cursor-pointer grow md:grow-0 relative"
              >
                <p className="absolute z-40 text-white">{board.name}</p>

                <Image
                  src={board.imageUrl}
                  alt="nature picture"
                  // objectFit="cover"
                  fill
                  className="rounded-lg "
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

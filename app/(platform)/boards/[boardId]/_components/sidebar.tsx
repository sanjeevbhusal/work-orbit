"use client";

import { IoSettingsOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Board } from "@prisma/client";
import Image from "next/image";
import { cn } from "@/lib/utils";

const sideBarLinks = [
  // {
  //   name: "Boards",
  //   icon: <BsListTask />,
  //   url: "/boards",
  // },
  // {
  //   name: "Activity",
  //   icon: <TbActivity />,
  //   url: "/activity",
  // },
  // {
  //   name: "Settings",
  //   icon: <IoSettingsOutline />,
  //   url: "/settings",
  // },
];

interface SidebarProps {
  currentBoard: Board;
  otherBoards: Board[];
}

function Sidebar({ currentBoard, otherBoards }: SidebarProps) {
  const pathname = usePathname();
  console.log({ pathname });

  return (
    // <div className="py-4 border-r pr-2">
    //   <div className="flex-col hidden gap-4 lg:flex">
    //     {/* {sideBarLinks.map((link) => (
    //       <Link href={`${pathname}${link.url}`} key={link.name}>
    //         <Button
    //           variant={"ghost"}
    //           className={cn(
    //             "justify-start gap-2 cursor-pointer font-normal pr-8 w-48 hover:bg-slate-200",
    //             {
    //               "bg-slate-200": pathname.includes(link.url),
    //             }
    //           )}
    //         >
    //           {link.icon}
    //           <h3 className="text-sm">{link.name}</h3>
    //         </Button>
    //       </Link>
    //     ))} */}
    //   </div><
    <div className="border-r overflow-y-auto basis-64">
      <div className="border-b py-4">
        <p className="text-sm font-medium px-4">Current Board</p>
        <Link href={`/boards/${currentBoard.id}`}>
          <div className="flex items-center gap-2 mt-2 hover:bg-slate-200 cursor-pointer py-2 px-4">
            <div className="w-12 h-8 relative ">
              <Image
                src={currentBoard.smallImageUrl}
                alt={currentBoard.name}
                fill
                className="rounded-sm"
              />
            </div>

            <p className="text-sm text-neutal-500">{currentBoard.name}</p>
          </div>
        </Link>
        <Link
          href={
            pathname.includes("/settings") ? pathname : `${pathname}/settings`
          }
        >
          <Button
            className={cn(
              "mt-2 flex justify-start gap-2 w-full hover:bg-slate-200",
              {
                "bg-slate-200": pathname.includes("/settings"),
              }
            )}
            variant="ghost"
          >
            <IoSettingsOutline />
            Board Settings
          </Button>
        </Link>
      </div>
      <div className="border-b py-4">
        <p className="text-sm font-medium px-4">Other Boards</p>
        <div className="flex flex-col gap-2">
          {otherBoards.map((board) => (
            <Link key={board.id} href={`/boards/${board.id}`}>
              <div className="flex items-center gap-2 mt-2 hover:bg-slate-200 cursor-pointer py-2 px-4">
                <div className="w-12 h-8 relative ">
                  <Image
                    src={board.smallImageUrl}
                    alt={board.name}
                    fill
                    className="rounded-sm"
                  />
                </div>
                <p className="text-sm text-neutal-500">{board.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Sidebar };

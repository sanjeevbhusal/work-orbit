"use client";

import { BsListTask } from "react-icons/bs";
import { CreateWorkspace } from "./create-workspace";

import { TbActivity } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sideBarLinks = [
  {
    name: "Board",
    icon: <BsListTask />,
    url: "/",
  },
  {
    name: "Activity",
    icon: <TbActivity />,
    url: "/activity",
  },
  {
    name: "Settings",
    icon: <IoSettingsOutline />,
    url: "/settings",
  },
];

function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="py-4 pr-2 border-r lg:pr-6">
      <div className="flex-col hidden gap-8 lg:flex">
        {sideBarLinks.map((link) => (
          <Link href={`${pathname}${link.url}`} key={link.name}>
            <Button
              variant={"ghost"}
              className={cn(
                "justify-start gap-4 cursor-pointer font-normal pr-8 text-slate-600 w-48 hover:bg-green-50",
                {
                  "bg-green-100 text-green-500": pathname.includes(link.url),
                }
              )}
            >
              {link.icon}
              <h3 className="text-sm">{link.name}</h3>
            </Button>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-8 lg:hidden">
        {sideBarLinks.map((link) => (
          <Link href={`${pathname}${link.url}`} key={link.name}>
            <Button
              variant={"ghost"}
              className={cn("text-lg hover:bg-green-50", {
                "bg-green-100 text-green-500": pathname.includes(link.url),
              })}
            >
              {link.icon}
            </Button>
          </Link>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
}

export { Sidebar };

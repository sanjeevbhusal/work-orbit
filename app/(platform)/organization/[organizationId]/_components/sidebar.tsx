"use client";

import { BsListTask } from "react-icons/bs";
import { TbActivity } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sideBarLinks = [
  {
    name: "Boards",
    icon: <BsListTask />,
    url: "/boards",
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
  console.log(pathname, pathname.split("/"));

  return (
    <div className="py-4 border-r pr-2">
      <div className="flex-col hidden gap-4 lg:flex">
        {sideBarLinks.map((link) => (
          <Link href={`${pathname}${link.url}`} key={link.name}>
            <Button
              variant={"ghost"}
              className={cn(
                "justify-start gap-2 cursor-pointer font-normal pr-8 w-48 hover:bg-slate-200",
                {
                  "bg-slate-200": pathname.includes(link.url),
                }
              )}
            >
              {link.icon}
              <h3 className="text-sm">{link.name}</h3>
            </Button>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-4 lg:hidden">
        {sideBarLinks.map((link) => (
          <Link href={`${pathname}${link.url}`} key={link.name}>
            <Button
              variant={"ghost"}
              className={cn("text-lg hover:bg-slate-200", {
                "bg-slate-200": pathname.includes(link.url),
              })}
            >
              {link.icon}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { Sidebar };

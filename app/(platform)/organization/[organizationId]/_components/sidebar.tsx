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
    <div className="border-r py-4 pr-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 ">
          {sideBarLinks.map((link) => (
            <Link href={`${pathname}${link.url}`} key={link.name}>
              <Button
                variant={"ghost"}
                className={cn(
                  "justify-start gap-4 cursor-pointer font-normal pr-8 text-slate-600",
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
          {/* <Link href="#">
            <Button
              variant={"ghost"}
              className={cn(
                "justify-start gap-4 cursor-pointer font-normal pr-8",
                {
                  "bg-green-100": pathname.includes("/organization"),
                }
              )}
            >
              <BsListTask />
              <h3 className="text-sm text-slate-600">Board</h3>
            </Button>
          </Link>
          <Link href={`${pathname}/activity`}>
            <Button
              variant={"ghost"}
              className="justify-start gap-4 cursor-pointer font-normal pr-8"
            >
              <TbActivity />
              <h3 className="text-sm text-slate-600">Activity</h3>
            </Button>
          </Link>
          <Link href={`${pathname}/settings`}>
            <Button
              variant={"ghost"}
              className="justify-start gap-4 cursor-pointer font-normal pr-8"
            >
              <IoSettingsOutline />
              <h3 className="text-sm text-slate-600">Settings</h3>
            </Button>
          </Link> */}

          {/* <CreateWorkspace /> */}
        </div>
      </div>
    </div>
  );
}

export { Sidebar };

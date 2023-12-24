import { cn } from "@/lib/utils";
import { NavBar } from "./_components/navbar";
import { SetActiveOrganization } from "./_components/set-active-organization";
import { Sidebar } from "./_components/sidebar";
import { headers } from "next/headers";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <NavBar />
      <SetActiveOrganization />
      <div className="px-4 h-[calc(100%-65px)]">
        <div className="mx-auto max-w-7xl flex h-full">
          <Sidebar />
          <div className="grow py-4 pl-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

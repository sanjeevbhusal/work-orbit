import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function NavBar() {
  return (
    <div className="p-4 bg-white border-b">
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        {/* TODO: Implement navbar for small screen */}
        <Logo />
        <div className="flex gap-12 items-center">
          <div className="">
            <OrganizationSwitcher
              hidePersonal
              afterSelectOrganizationUrl="/organization/:id"
              afterCreateOrganizationUrl="/organization/:id"
              afterLeaveOrganizationUrl="/select-organization"
              appearance={{
                elements: {
                  rootBox: {
                    height: "30px",
                  },
                  organizationPreviewAvatarContainer: {
                    height: "30px",
                  },
                  organizationPreviewAvatarBox: {
                    height: "30px",
                  },
                },
              }}
            />
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}

export { NavBar };

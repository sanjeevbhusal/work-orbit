import { NavBar } from "./_components/navbar";
import { SetActiveOrganization } from "./_components/set-active-organization";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <NavBar />
      <SetActiveOrganization />
      <div className="grow">{children}</div>
    </div>
  );
}

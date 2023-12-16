import { NavBar } from "./_components/navbar";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <NavBar />
      <div className="pt-4">{children}</div>
    </div>
  );
}

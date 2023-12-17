import { Button } from "@/components/ui/button";
import { SetActiveOrganization } from "./_components/set-active-organization";

interface OrganizationPageProps {
  params: {
    organizationId: string;
  };
}

export default function OrganizationPage({
  params: { organizationId },
}: OrganizationPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:p-0">
      <SetActiveOrganization />
      <Button size={"sm"} variant="primary" className="ml-auto block">
        Create Task
      </Button>
    </div>
  );
}

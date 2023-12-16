import { Button } from "@/components/ui/button";

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
      <Button size={"sm"} variant="primary" className="ml-auto block">
        Create Task
      </Button>
    </div>
  );
}

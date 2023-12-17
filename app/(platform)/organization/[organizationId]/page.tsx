import { Button } from "@/components/ui/button";
import { Sidebar } from "./_components/sidebar";

export default function OrganizationPage() {
  return (
    <div className="h-full mx-auto max-w-7xl px-4 xl:p-0 flex justify-between">
      <Sidebar />
      <div className="pt-4">
        <Button size={"sm"} variant="primary">
          Create Task
        </Button>
      </div>
    </div>
  );
}

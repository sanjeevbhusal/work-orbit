import { CreateWorkspace } from "./create-workspace";
import { ListWorkspaces } from "./list-workspaces";

async function Sidebar() {
  return (
    <div className="border-r py-4 pr-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-slate-600">Workspaces</h3>
          <CreateWorkspace />
        </div>
        <ListWorkspaces />
      </div>
    </div>
  );
}

export { Sidebar };

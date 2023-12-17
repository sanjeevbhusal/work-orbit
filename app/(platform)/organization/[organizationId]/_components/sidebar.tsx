import { CreateWorkspace } from "./create-workspace";

function Sidebar() {
  return (
    <div className="border-r py-4 pr-4">
      <div className="flex w-40 items-center justify-between">
        <h3 className="text-sm text-slate-600">Workspaces</h3>
        <CreateWorkspace />
      </div>
    </div>
  );
}

export { Sidebar };

import { getWorkspaces } from "@/actions/getWorkspaces";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsListTask } from "react-icons/bs";
import { TbActivity } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

async function ListWorkspaces() {
  const workspaces = await getWorkspaces();
  console.log(workspaces);

  return (
    <Accordion type="single" collapsible>
      {workspaces.map((workspace) => (
        <AccordionItem value={workspace.id} key={workspace.id} className="w-48">
          <AccordionTrigger className="text-base font-semibold text-left">
            {workspace.name}
          </AccordionTrigger>
          <AccordionContent>
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "text-slate-600 font-normal text-sm w-full justify-start gap-4 hover:bg-green-100 cursor-pointer hover:text-green-600"
              )}
            >
              <BsListTask />
              Boards
            </div>
          </AccordionContent>
          <AccordionContent>
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "text-slate-600 font-normal text-sm w-full justify-start hover:bg-green-100 cursor-pointer hover:text-green-600 gap-4"
              )}
            >
              <TbActivity />
              Activity
            </div>
          </AccordionContent>
          <AccordionContent>
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "text-slate-600  font-normal text-sm w-full justify-start hover:bg-green-100 cursor-pointer hover:text-green-600 gap-4"
              )}
            >
              <IoSettingsOutline />
              Settings
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { ListWorkspaces };

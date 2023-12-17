"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Workspace Name must be atleast 2 characters")
    .max(50, "Workspace Name cannot be more than 25 characters"),
});

function CreateWorkspace() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const { toast, toasts } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCreatingWorkspace(true);
    try {
      await axios.post("/api/workspace", values);
      toast({
        description: "Workspace created successfully!",
        className: "bg-green-500 text-white ",
      });
      router.refresh();
    } catch {
      toast({
        description: "Workspace created successfully!",
        className: "bg-green-500 text-white ",
      });
    } finally {
      setIsCreatingWorkspace(false);
      setOpenDialog(false);
    }
  }

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
        <DialogTrigger className="flex">
          <FaPlus />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
            <DialogDescription>
              This workspace will be created in your currently selected
              organization.
            </DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {isCreatingWorkspace ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { CreateWorkspace };

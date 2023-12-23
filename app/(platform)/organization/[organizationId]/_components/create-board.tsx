"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  boardName: z
    .string()
    .min(2, "Board Name must be atleast 2 characters")
    .max(40, "Board Name cannot be more than 40 characters"),
});

function CreateBoard() {
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boardName: "",
    },
  });
  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.refresh();
    }, 2000);
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await axios.post("/api/board", { name: values.boardName });
      router.refresh();
      setShowCreateBoardModal(false);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 409) {
        form.setError("boardName", {
          type: "manual",
          message: "This board name is already taken.",
        });
      } else {
        toast({
          description: "Something went wrong while creating the board",
          variant: "destructive",
        });
        setShowCreateBoardModal(false);
      }
    } finally {
      setIsLoading(false);
    }
    //  Make sure that another board with this name in this workspace doesnot exist. If it does, show the error
  }

  return (
    <div>
      <Dialog
        open={showCreateBoardModal}
        onOpenChange={(open) => setShowCreateBoardModal(open)}
      >
        <DialogTrigger asChild>
          <div>
            <Button
              size={"sm"}
              variant="primary"
              className="hidden lg:block"
              onClick={() => setShowCreateBoardModal(true)}
            >
              Create New Board
            </Button>
            <Button
              size={"sm"}
              variant="primary"
              className="text-lg lg:hidden"
              onClick={() => setShowCreateBoardModal(true)}
            >
              +
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left">Create Board</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="pt-4 space-y-8"
              >
                <FormField
                  control={form.control}
                  name="boardName"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Board Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>This has to be unique.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="ml-auto block">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Create"}
                </Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { CreateBoard };

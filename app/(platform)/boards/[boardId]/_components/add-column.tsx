import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Board } from "@prisma/client";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Column Name cannot be empty")
    .max(50, "Column Name cannot be more than 30 characters"),
});

interface AddColumnProps {
  board: Board;
}

function AddColumn({ board }: AddColumnProps) {
  const [showAddColumnInput, setShowAddColumnInput] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { toast } = useToast();

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/column?boardId=${board.id}`, values);
      router.refresh();
    } catch (error) {
      toast({
        description: "Something went wrong while creating the column",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setShowAddColumnInput(false);
    }
  }

  return (
    <div>
      {showAddColumnInput ? (
        <div className="p-2 bg-slate-100 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the name for this Column"
                        className="w-72"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end">
                <Button
                  variant={"primary"}
                  className="w-fit mt-2"
                  type="submit"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="animate-spin mr-2" />
                  )}
                  Add Column
                </Button>
                <Button
                  variant={"destructive"}
                  className="w-fit mt-2 ml-2"
                  onClick={() => setShowAddColumnInput(false)}
                  type="button"
                  disabled={form.formState.isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <Button
          size={"sm"}
          variant="outline"
          className="hidden lg:block bg-slate-100"
          onClick={() => setShowAddColumnInput(true)}
        >
          Create New Column
        </Button>
      )}
    </div>
  );
}

export { AddColumn };

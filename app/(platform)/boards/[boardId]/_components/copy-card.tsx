// when you copy a card, you are basically creating the card again. Hence, this is similar to creat-card.

import { Task } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";

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
import { BsPlusLg } from "react-icons/bs";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Task Name cannot be empty")
    .max(50, "Task Name cannot be more than 50 characters"),
});

interface CopyCardProps {
  card: Task;
  onSuccess: () => void;
}

function CopyCard({ card, onSuccess }: CopyCardProps) {
  const [showCopyTaskInput, setShowCopyTaskInput] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    form.setValue("name", card.task);
  }, [card]);

  const { toast } = useToast();

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/task?columnId=${card.columnId}`, values);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      onSuccess();
      router.refresh();
    } catch (error) {
      toast({
        description: "Something went wrong while copying the task",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setShowCopyTaskInput(false);
    }
  }

  return (
    <div className="mt-4">
      <Label>Copy this Card</Label>
      <p className="text-xs mt-1">
        The new card will be copied in the same column as this card.
      </p>
      {showCopyTaskInput ? (
        <div className="mt-2">
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
                        placeholder="Enter the title for this task"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-auto w-fit flex justify-between gap-2 mt-2">
                <Button variant={"primary"} onClick={() => {}} size="sm">
                  {form.formState.isSubmitting && (
                    <Loader2 className="animate-spin mr-2" />
                  )}
                  Copy task
                </Button>
                <Button
                  variant={"destructive"}
                  className="text-sm"
                  onClick={() => setShowCopyTaskInput(false)}
                  disabled={form.formState.isSubmitting}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <Button
          onClick={() => setShowCopyTaskInput(true)}
          variant="primary"
          size="sm"
          className="mt-2"
        >
          Copy Task
        </Button>
      )}
    </div>
  );
}

export { CopyCard };

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
import { BsPlusLg } from "react-icons/bs";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Card Name cannot be empty")
    .max(50, "Card Name cannot be more than 50 characters"),
});

interface AddColumnProps {
  columnId: string;
}

function AddCard({ columnId }: AddColumnProps) {
  const [showAddCardInput, setShowAddCardInput] = useState(false);

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
      await axios.post(`/api/card?columnId=${columnId}`, values);
      router.refresh();
    } catch (error) {
      toast({
        description: "Something went wrong while creating the card",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setShowAddCardInput(false);
    }
  }

  return (
    <div className="mt-4">
      {showAddCardInput ? (
        <div className="px-4">
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
                        placeholder="Enter the title for this card"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-auto w-fit flex justify-between gap-2 mt-2">
                <Button variant={"primary"} onClick={() => {}}>
                  {form.formState.isSubmitting && (
                    <Loader2 className="animate-spin mr-2" />
                  )}
                  Add Card
                </Button>
                <Button
                  variant={"destructive"}
                  className="text-sm"
                  onClick={() => setShowAddCardInput(false)}
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
          onClick={() => setShowAddCardInput(true)}
          variant="ghost"
          className="justify-start w-full hover:bg-slate-200"
        >
          <BsPlusLg className="mr-2 text-lg" />
          Add a Card
        </Button>
      )}
    </div>
  );
}

export { AddCard };

"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { BoardWithColumnAndCards } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Board name cannot be less than 2 characters")
    .max(50, "Board name cannot be more than 50 characters"),
  description: z
    .string()
    .max(5000, "Description cannot be more than 5000 characters")
    .optional(),
});

interface SettingsPageProps {
  board: BoardWithColumnAndCards;
}

function Settings({ board }: SettingsPageProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: board.name,
      description: board.description || "",
    },
  });

  useEffect(() => {
    async function fetchBoard() {
      try {
        const response = await axios.get(`/api/boards/${board.id}`);
        const { name, description } = response.data.data;
        form.setValue("name", name);
        form.setValue("description", description);
      } catch (error) {
        // TODO: display some error message
      } finally {
        // Display a loading spinner
      }
    }

    // form.setValue("name", board.name);
    // form.setValue("description", board.description || "");

    // fetchBoard();
  }, [form, board]);

  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put(`/api/board/${board.id}`, {
        name: values.name,
        description: values.description,
      });

      router.refresh();
      toast({
        description: "Board updated successfully",
      });
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.response);

      if (error.response?.status === 409) {
        form.setError("name", {
          message: "This board name is already taken.",
        });
      } else {
        toast({
          description: "Something went wrong while updating the board settings",
          variant: "destructive",
        });
      }
    }
  }
  return (
    <div className="py-4 px-8">
      <h1 className="font-bold text-lg">Settings</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-[800px] mt-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Board Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>This has to be unique.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Board Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="This board is used to track work that needs to be done for Marketing Department in January..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 animate-spin" />
            )}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export { Settings };
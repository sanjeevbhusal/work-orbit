import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Task } from "@prisma/client";
import { CiEdit } from "react-icons/ci";

interface EditCardProps {
  card: Task;
}

// Update the card title,
// View card's activity

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Task Name cannot be empty")
    .max(50, "Task Name cannot be more than 50 characters"),
});

function EditCard({ card }: EditCardProps) {
  const [showSheet, setShowSheet] = useState(false);

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
      await axios.put(`/api/task/${card.id}`, values);
      router.refresh();
    } catch (error) {
      toast({
        description: "Something went wrong while creating the task",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setShowSheet(false);
    }
  }

  return (
    <Sheet open={showSheet} onOpenChange={(open) => setShowSheet(open)}>
      <SheetTrigger asChild>
        <div className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-pointer">
          <CiEdit size={20} />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{card.task}</SheetTitle>
          <SheetDescription></SheetDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormItem>
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormMessage />
              </FormItem>
              <Button className="block mr-auto mt-4">Update Profile</Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export { EditCard };

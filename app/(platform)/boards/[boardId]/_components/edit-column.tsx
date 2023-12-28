import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
import { useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { Column } from "@prisma/client";

interface EditCardProps {
  column: Column;

  open: boolean;
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Column Name cannot be empty")
    .max(50, "Column Name cannot be more than 50 characters"),
});

function EditColumn({ column, open, setOpen }: EditCardProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    form.setValue("name", column.name);
  }, [form, column]);

  const { toast } = useToast();

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put(`/api/column/${column.id}`, values);
      router.refresh();
    } catch (error) {
      toast({
        description: "Something went wrong while editing the column",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setOpen(false);
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        // change the form state to default
        form.setValue("name", column.name);
        setOpen(open);
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{column.name}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
            <FormItem>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Column Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormMessage />
            </FormItem>
            <Button className="mr-auto mt-4">
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 animate-spin" />
              )}
              Update Column
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export { EditColumn };

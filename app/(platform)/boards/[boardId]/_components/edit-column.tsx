import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Column } from '@prisma/client';

interface EditCardProps {
  column: Column;

  open: boolean;
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(1, 'Column Name cannot be empty').max(50, 'Column Name cannot be more than 50 characters'),
  description: z.string().max(5000, 'Column Name cannot be more than 5000 characters').optional(),
});

function EditColumn({ column, open, setOpen }: EditCardProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: column.name,
      description: column.description || undefined,
    },
  });

  useEffect(() => {
    form.setValue('name', column.name);
    form.setValue('description', column.description || undefined);
  }, [form, column]);

  const { toast } = useToast();

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put(`/api/column/${column.id}`, values);
      router.refresh();
    } catch (error) {
      toast({
        description: 'Something went wrong while editing the column',
        variant: 'destructive',
      });
      form.reset();
    } finally {
      // form.reset();
      // setOpen(false);
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        // change the form state to default
        form.setValue('name', column.name);
        setOpen(open);
      }}
    >
      <SheetContent className="w-[600px] sm:max-w-none">
        <SheetHeader>
          <SheetTitle className="text-base">Edit Column {column.name}</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
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
            <FormItem className="mt-4">
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Column Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="This Column holds all the cards that should be worked upon in this week."
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormMessage />
            </FormItem>
            <Button className="mr-auto mt-4">
              {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
              Update Column
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export { EditColumn };

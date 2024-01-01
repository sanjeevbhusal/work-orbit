import { CiEdit } from 'react-icons/ci';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface EditCardProps {
  card: Card;
}

// Update the card title,
// View card's activity

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@prisma/client';

import { CopyCard } from './copy-card';
import { DeleteCard } from './delete-card';

const formSchema = z.object({
  name: z.string().min(1, 'Card Name cannot be empty').max(50, 'Card Name cannot be more than 50 characters'),
});

function EditCard({ card }: EditCardProps) {
  const [showSheet, setShowSheet] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    form.setValue('name', card.name);
  }, [card]);

  const { toast } = useToast();

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put(`/api/card/${card.id}`, values);
      router.refresh();
    } catch (error) {
      toast({
        description: 'Something went wrong while creating the card',
        variant: 'destructive',
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
          <SheetTitle>{card.name}</SheetTitle>
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
                    <FormLabel>Card Name</FormLabel>
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
              {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
              Update Profile
            </Button>
          </form>
        </Form>
        <DeleteCard card={card} />
        <CopyCard card={card} onSuccess={() => setShowSheet(false)} />
      </SheetContent>
    </Sheet>
  );
}

export { EditCard };

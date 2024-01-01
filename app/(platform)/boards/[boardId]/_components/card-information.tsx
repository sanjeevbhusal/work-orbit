import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SectionTitle } from '@/components/section-title';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@prisma/client';

const formSchema = z.object({
  name: z.string().min(1, 'Card Name cannot be empty').max(50, 'Card Name cannot be more than 50 characters'),
  description: z.string().optional(),
});

interface CardInformationProps {
  card: Card;
}

function CardInformation({ card }: CardInformationProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: card.name,
      description: undefined,
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put(`/api/card/${card.id}`, values);
      router.refresh();
    } catch (error) {
      toast({
        description: 'Something went wrong while updating the card',
        variant: 'destructive',
      });
      // {TODO: reset the form in finally block}
      form.reset();
    } finally {
    }
  }
  return (
    <div>
      <SectionTitle>Card Information</SectionTitle>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <FormItem>
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Description</FormLabel>
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

          <Button size="sm" className="mr-auto" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
            Update Card
          </Button>
        </form>
      </Form>
    </div>
  );
}

export { CardInformation };

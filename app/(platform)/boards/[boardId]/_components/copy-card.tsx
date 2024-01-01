// when you copy a card, you are basically creating the card again. Hence, this is similar to creat-card.

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@prisma/client';

const formSchema = z.object({
  name: z.string().min(1, 'Card Name cannot be empty').max(50, 'Card Name cannot be more than 50 characters'),
});

interface CopyCardProps {
  card: Card;
  onSuccess: () => void;
}

function CopyCard({ card, onSuccess }: CopyCardProps) {
  const [showCopyCardInput, setShowCopyCardInput] = useState(false);

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
      await axios.post(`/api/card?columnId=${card.columnId}`, values);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      onSuccess();
      router.refresh();
    } catch (error) {
      toast({
        description: 'Something went wrong while copying the card',
        variant: 'destructive',
      });
    } finally {
      form.reset();
      setShowCopyCardInput(false);
    }
  }

  return (
    <div className="mt-4">
      <Label>Copy this Card</Label>
      <p className="text-xs mt-1">The new card will be copied in the same column as this card.</p>
      {showCopyCardInput ? (
        <div className="mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Enter the title for this card" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-auto w-fit flex justify-between gap-2 mt-2">
                <Button variant={'primary'} onClick={() => {}} size="sm">
                  {form.formState.isSubmitting && <Loader2 className="animate-spin mr-2" />}
                  Copy Card
                </Button>
                <Button
                  variant={'destructive'}
                  className="text-sm"
                  onClick={() => setShowCopyCardInput(false)}
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
        <Button onClick={() => setShowCopyCardInput(true)} variant="primary" size="sm" className="mt-2">
          Copy Card
        </Button>
      )}
    </div>
  );
}

export { CopyCard };

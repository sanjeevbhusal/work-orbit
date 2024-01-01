import axios from 'axios';
import dayjs from 'dayjs';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SectionTitle } from '@/components/section-title';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Comment } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
  text: z.string().min(1, 'Comment cannot be empty'),
});

interface CardInformationProps {
  card: Card;
}

function CardComments({ card }: CardInformationProps) {
  const {
    data: comments,

    error,
    isFetching,
  } = useQuery<Comment[]>({
    queryKey: [card, 'comments'],
    queryFn: async () => {
      const response = await axios.get(`/api/comment?cardId=${card.id}`);
      return response.data.data;
    },
    retry: false,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await axios.post(`/api/comment`, { ...values, cardId: card.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [card, 'comments'] });
      form.reset();
    },
    onError: () => {
      toast({
        description: 'Something went wrong while creating the comment',
        variant: 'destructive',
      });
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  const { toast } = useToast();

  return (
    <div>
      <SectionTitle>Comments</SectionTitle>
      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => mutate(values))}
          className="space-y-6 mt-6"
        >
          <FormItem>
            <FormField
              name="text"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Write a comment" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormMessage />
          </FormItem>

          <Button size="sm" className="mr-auto" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 animate-spin" />}
            Add Comment
          </Button>
        </form>
      </Form>

      <div className="mt-8">
        {isFetching ? (
          <Loader2 className="animate-spin mx-auto" />
        ) : error ? (
          <p className="text-neutral-500">
            Oops!! Something went wrong while fetching comments.
          </p>
        ) : comments?.length === 0 ? (
          <p className="text-neutral-500">No comments yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {comments?.map((comment) => (
              <div
                key={comment.id}
                className="flex flex-col gap-4 py-2 px-4 border rounded-lg "
              >
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <p className="font-semibold text-sm">Sanjeev Bhusal</p>
                  <p className="text-xs text-neutral-500">
                    {dayjs(comment.createdAt).format('DD MMMM, YYYY')}
                  </p>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { CardComments };

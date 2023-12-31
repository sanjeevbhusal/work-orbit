import { Card, Comment } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SectionTitle } from "@/components/section-title";
import { Separator } from "@/components/ui/separator";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  text: z.string().min(1, "Comment cannot be empty"),
});

interface CardInformationProps {
  card: Card;
}

function CardComments({ card }: CardInformationProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // {TODO: move this into react-query}
    async function fetchCardComments() {
      try {
        const response = await axios.get(`/api/comment?cardId=${card.id}`);
        const comments = response.data.data;
        setComments(comments);
      } catch (error) {}
    }

    fetchCardComments();
  }, [card]);

  async function addComment(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/comment`, { ...values, cardId: card.id });
      router.refresh();
    } catch (error) {
      toast({
        description: "Something went wrong while creating the comment",
        variant: "destructive",
      });
    } finally {
      form.reset();
    }
  }
  return (
    <div>
      <SectionTitle>Comments</SectionTitle>
      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addComment)}
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

          <Button
            size="sm"
            className="mr-auto"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 animate-spin" />
            )}
            Add Comment
          </Button>
        </form>
      </Form>

      <div className="flex flex-col gap-4 mt-8">
        {comments.map((comment) => (
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
                {dayjs(comment.createdAt).format("DD MMMM, YYYY")}
              </p>
            </div>
            <p className="text-sm">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CardComments };

"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoCheckmark } from "react-icons/io5";
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
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { unsplash } from "@/lib/unsplash";
import Image from "next/image";
import BoardImage from "@/public/board-image.svg";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  boardName: z
    .string()
    .min(2, "Board Name must be atleast 2 characters")
    .max(40, "Board Name cannot be more than 40 characters"),
});

interface CreateBoardProps {
  images: { small: string; big: string }[];
}

function CreateBoard({ images }: CreateBoardProps) {
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [backgroundUrls, setBackgroundUrls] =
    useState<{ small: string; big: string }[]>(images);
  const [selectedBackgroundUrl, setSelectedBackgroundUrl] = useState<{
    small: string;
    big: string;
  }>(images[0]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boardName: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("/api/board", {
        name: values.boardName,
        backgroundUrl: selectedBackgroundUrl.big,
      });
      router.refresh();
      setShowCreateBoardModal(false);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 409) {
        form.setError("boardName", {
          type: "manual",
          message: "This board name is already taken.",
        });
      } else {
        toast({
          description: "Something went wrong while creating the board",
          variant: "destructive",
        });
        setShowCreateBoardModal(false);
      }
    }
  }

  console.log(selectedBackgroundUrl);

  return (
    <div>
      <Dialog
        open={showCreateBoardModal}
        onOpenChange={(open) => setShowCreateBoardModal(open)}
      >
        <DialogTrigger asChild>
          <div>
            <Button
              size={"sm"}
              variant="primary"
              className="hidden lg:block"
              onClick={() => setShowCreateBoardModal(true)}
            >
              Create New Board
            </Button>
            <Button
              size={"sm"}
              variant="primary"
              className="text-lg lg:hidden"
              onClick={() => setShowCreateBoardModal(true)}
            >
              +
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left">Create Board</DialogTitle>
          </DialogHeader>
          {selectedBackgroundUrl && (
            <div className="px-4 py-2 w-fit rounded-md mx-auto">
              <div className="relative w-[220px] h-[120px] flex items-center justify-center">
                <Image
                  src={selectedBackgroundUrl.small}
                  alt="nature image"
                  fill
                  className="rounded-md z-[-1]"
                />
                <Image
                  src={BoardImage}
                  alt="nature image"
                  width={180}
                  height={180}
                  className="rounded-md"
                />
              </div>
            </div>
          )}

          <Label>Background</Label>
          <div className="flex flex-wrap gap-4">
            {backgroundUrls.map((url) => (
              <div
                key={url.small}
                className="h-12 w-24 relative cursor-pointer flex items-center justify-center"
                onClick={() => setSelectedBackgroundUrl(url)}
              >
                <Image
                  src={url.small}
                  alt="nature image"
                  fill
                  className="rounded-md"
                />

                {selectedBackgroundUrl === url && (
                  <>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <IoCheckmark className="z-20 text-white text-2xl font-bold" />
                  </>
                )}
              </div>
            ))}
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="pt-4 space-y-8"
            >
              <FormField
                control={form.control}
                name="boardName"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Board Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>This has to be unique.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="ml-auto flex items-center justify-center"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin mr-2" />
                )}
                Create
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { CreateBoard };

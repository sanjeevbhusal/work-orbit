'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { Loader, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { IoCheckmark } from 'react-icons/io5';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { DEFAULT_BOARD_IMAGE_URLS } from '@/lib/constants';
import { BoardImage } from '@/lib/types';
import ColumnsImage from '@/public/board-image.svg';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  boardName: z
    .string()
    .min(2, 'Board Name must be atleast 2 characters')
    .max(40, 'Board Name cannot be more than 40 characters'),
});

function CreateBoard() {
  const [images, setImages] = useState<BoardImage[]>([]);
  const [isImagesLoading, setIsImagesLoading] = useState(false);

  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<BoardImage | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boardName: '',
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function fetchImages() {
      setIsImagesLoading(true);
      try {
        const response = await axios.get('/api/images');
        const images = response.data.data as BoardImage[];
        setImages(images);
        setSelectedImage(images[0]);
      } catch (error) {
        setImages(DEFAULT_BOARD_IMAGE_URLS);
        setSelectedImage(DEFAULT_BOARD_IMAGE_URLS[0]);
      } finally {
        setIsImagesLoading(false);
      }
    }

    if (!showCreateBoardModal) return;

    fetchImages();
  }, [showCreateBoardModal]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const image = selectedImage as BoardImage;
    try {
      await axios.post('/api/board', {
        name: values.boardName,
        smallImageUrl: image.small,
        largeImageUrl: image.large,
      });
      router.refresh();
      setShowCreateBoardModal(false);
      form.reset();
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.response);

      if (error.response?.status === 409) {
        form.setError('boardName', {
          message: 'This board name is already taken.',
        });
      } else {
        toast({
          description: 'Something went wrong while creating the board',
          variant: 'destructive',
        });
        setShowCreateBoardModal(false);
      }
    }
  }

  return (
    <div>
      <Dialog open={showCreateBoardModal} onOpenChange={(open) => setShowCreateBoardModal(open)}>
        <DialogTrigger asChild>
          <div>
            <Button
              size={'sm'}
              variant="primary"
              className="hidden lg:block"
              onClick={() => setShowCreateBoardModal(true)}
            >
              Create New Board
            </Button>
            <Button
              size={'sm'}
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
          {selectedImage && (
            <div className="px-4 py-2 w-fit rounded-md mx-auto">
              <div className="relative w-[220px] h-[120px] flex items-center justify-center">
                <Image src={selectedImage.small} alt={selectedImage.description} fill className="rounded-md z-[-1]" />
                <Image
                  src={ColumnsImage}
                  alt="Columns inside the Board"
                  width={180}
                  height={180}
                  className="rounded-md"
                />
              </div>
            </div>
          )}

          <Label>Background</Label>
          {isImagesLoading ? (
            <Loader2 className="animate-spin mx-auto" />
          ) : (
            <div className="flex flex-wrap gap-4">
              {images.map((image) => (
                <div
                  key={image.small}
                  className="h-12 w-24 relative cursor-pointer flex items-center justify-center hover:opacity-80"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image src={image.small} alt={image.description} fill className="rounded-md" />

                  {selectedImage === image && (
                    <>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <IoCheckmark className="z-20 text-white text-2xl font-bold" />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="pt-4 space-y-8">
              <FormField
                control={form.control}
                name="boardName"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Board Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Marketing, Software Engineering, Finance etc" {...field} />
                    </FormControl>
                    <FormDescription>This has to be unique.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="ml-auto flex items-center justify-center"
                disabled={form.formState.isSubmitting || !selectedImage}
              >
                {form.formState.isSubmitting && <Loader2 className="animate-spin mr-2" />}
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

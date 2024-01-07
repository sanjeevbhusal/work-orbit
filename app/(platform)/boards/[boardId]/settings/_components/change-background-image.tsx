import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

import { BackgroundImageSelect } from '@/components/BackgroundImageSelect';
import { SectionTitle } from '@/components/section-title';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { BoardImage } from '@/lib/types';
import { Board } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';

interface ChangeBackgroundImageProps {
  board: Board;
}

function ChangeBackgroundImage({ board }: ChangeBackgroundImageProps) {
  const {
    data: images,
    error,
    isFetching,
  } = useQuery<BoardImage[]>({
    queryKey: ['images'],
    queryFn: async () => {
      const response = await axios.get('/api/images');
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: updateBackgroundImage, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      await axios.put(`/api/board/${board.id}`, {
        smallImageUrl: selectedImage?.small,
        largeImageUrl: selectedImage?.large,
      });
    },
    onSuccess: () => {
      setOpenDialog(false);
      router.refresh();
    },
    onError: () => {
      toast({
        description: 'Something went wrong while updating the image',
        variant: 'destructive',
      });
    },
  });

  const [selectedImage, setSelectedImage] = useState<BoardImage | undefined>();

  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!images) return;
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div className="mt-8">
      <SectionTitle>Change Background Image</SectionTitle>
      <>
        <Image
          src={board.largeImageUrl}
          width={200}
          height={100}
          alt="image"
          className="mt-4 rounded-lg"
        />
        <Button
          className={'mt-4'}
          variant="outline"
          size="sm"
          onClick={() => setOpenDialog(true)}
        >
          Choose another Image
        </Button>
      </>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left">
              Update Background Image
            </DialogTitle>
          </DialogHeader>

          <BackgroundImageSelect
            label="Background"
            images={images || []}
            loading={isFetching}
            onImageSelect={setSelectedImage}
            selectedImage={selectedImage}
            key={selectedImage?.small}
          />
          <Button
            type="button"
            className="mt-2 ml-auto"
            size="sm"
            disabled={isUpdating}
            onClick={() => updateBackgroundImage()}
          >
            {isUpdating && <Loader2 className="animate-spin mr-2" />}
            Update Background Image
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { ChangeBackgroundImage };

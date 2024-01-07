import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { IoCheckmark } from 'react-icons/io5';

import { BoardImage } from '@/lib/types';
import ColumnsImage from '@/public/board-image.svg';

import { Label } from './ui/label';

interface BackgroundSelectProps {
  label: string;
  loading: boolean;
  images: BoardImage[];
  onImageSelect: (image: BoardImage) => void;
  selectedImage: BoardImage | undefined;
}

function BackgroundImageSelect({
  label,
  loading,
  images,
  onImageSelect,
  selectedImage,
}: BackgroundSelectProps) {
  return (
    <>
      {selectedImage && (
        <div className="px-4 py-2 w-fit rounded-md mx-auto">
          <div className="relative w-[220px] h-[120px] flex items-center justify-center">
            <Image
              src={selectedImage.small}
              alt={selectedImage.description}
              fill
              className="rounded-md z-[-1]"
            />
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
      <Label>{label}</Label>
      {loading ? (
        <Loader2 className="animate-spin mx-auto" />
      ) : (
        <div className="flex flex-wrap gap-4">
          {images.map((image) => (
            <div
              key={image.small}
              className="h-12 w-24 relative cursor-pointer flex items-center justify-center hover:opacity-80"
              onClick={() => onImageSelect(image)}
            >
              <Image
                src={image.small}
                alt={image.description}
                fill
                className="rounded-md"
              />

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
    </>
  );
}

export { BackgroundImageSelect };

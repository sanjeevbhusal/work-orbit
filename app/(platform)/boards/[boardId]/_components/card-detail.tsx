import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card } from '@prisma/client';

import { CardComments } from './card-comments';
import { CardHistory } from './card-history';
import { CardInformation } from './card-information';

interface CardDetailsProps {
  card: Card;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CardDetails({ card, open, onOpenChange }: CardDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[800px] max-w-none h-[90%] overflow-auto">
        <div className="flex flex-col gap-12">
          <CardInformation card={card} />
          <CardHistory card={card} />
          <CardComments card={card} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { CardDetails };

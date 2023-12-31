import { Draggable } from "react-beautiful-dnd";

import { EditCard } from "./edit-card";
import { Card } from "@prisma/client";
import { useState } from "react";
import { CardDetails } from "./card-detail";

interface CardProps {
  card: Card;
  index: number;
}

function Card({ card, index }: CardProps) {
  const [openCardDetails, setOpenCardDetails] = useState(false);

  return (
    <div>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            className="p-2 border rounded-lg bg-white text-sm hover:border-green-500 hover:border-2 flex justify-between items-center cursor-pointer"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={() => setOpenCardDetails(true)}
          >
            {card.name}
            <EditCard card={card} />
          </div>
        )}
      </Draggable>
      <CardDetails
        card={card}
        open={openCardDetails}
        onOpenChange={(open) => setOpenCardDetails(open)}
      />
    </div>
  );
}

export { Card };

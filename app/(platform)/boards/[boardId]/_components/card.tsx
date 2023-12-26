import { Draggable } from "react-beautiful-dnd";

import { EditCard } from "./edit-card";
import { Task } from "@prisma/client";

interface CardProps {
  card: Task;
  index: number;
}

function Card({ card, index }: CardProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="p-2 border rounded-lg bg-white text-sm hover:border-green-500 hover:border-2 flex justify-between items-center cursor-pointer"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {card.task}
          <EditCard card={card} />
        </div>
      )}
    </Draggable>
  );
}

export { Card };

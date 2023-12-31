import { Card as CardType } from "@prisma/client";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import { ColumnOptions } from "./column-options";
import { AddCard } from "./add-card";
import { Card } from "./card";
import { ColumnWithCards } from "@/lib/types";

interface ColumnProps {
  column: ColumnWithCards;
}

function Column({ column }: ColumnProps) {
  const [isCardAdding, setIsCardAdding] = useState(false);

  return (
    <div className="w-96 py-2 bg-[#F5F8FA] rounded-lg max-h-full shrink-0 flex flex-col">
      <div className="flex justify-between items-center px-4">
        <h1 className="font-semibold text-md">{column.name}</h1>
        <ColumnOptions
          column={column}
          onCardAdd={() => setIsCardAdding(true)}
        />
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="flex gap-4 flex-col mt-2 px-4 overflow-y-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {column.cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddCard column={column} />
    </div>
  );
}

export { Column };

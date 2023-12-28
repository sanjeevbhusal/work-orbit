import { Card as CardType } from "@prisma/client";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import { ColumnOptions } from "./column-options";
import { AddCard } from "./add-card";
import { Card } from "./card";

interface ColumnProps {
  id: string;
  name: string;
  cards: CardType[];
}

function Column({ id, name, cards }: ColumnProps) {
  const [isCardAdding, setIsCardAdding] = useState(false);

  return (
    <div className="w-96 py-2 bg-[#F5F8FA] rounded-lg shrink-0">
      <div className="flex justify-between items-center px-4">
        <h1 className="font-semibold text-md">{name}</h1>
        <ColumnOptions
          columnId={id}
          columnName={name}
          onCardAdd={() => setIsCardAdding(true)}
        />
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="flex gap-4 flex-col mt-2 px-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddCard columnId={id} />
    </div>
  );
}

export { Column };

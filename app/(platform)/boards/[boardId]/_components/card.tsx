import { Draggable } from "react-beautiful-dnd";

interface CardProps {
  id: string;
  task: string;
  index: number;
}

function Card({ id, task, index }: CardProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="p-2 border rounded-lg bg-slate-100 text-md"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task}
        </div>
      )}
    </Draggable>
  );
}

export { Card };

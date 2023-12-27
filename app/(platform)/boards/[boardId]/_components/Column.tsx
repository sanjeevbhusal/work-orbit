import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@prisma/client";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Card } from "./card";
import { BsThreeDots } from "react-icons/bs";
import { ColumnOptions } from "./column-options";
import { BsPlusLg } from "react-icons/bs";
import { AddTask } from "./add-task";

interface ColumnProps {
  id: string;
  name: string;
  tasks: Task[];
}

function Column({ id, name, tasks }: ColumnProps) {
  const [isTaskAdding, setIsTaskAdding] = useState(false);

  return (
    <div className="w-96 py-2 bg-[#F5F8FA] rounded-lg shrink-0">
      <div className="flex justify-between items-center px-4">
        <h1 className="font-semibold text-md">{name}</h1>
        <ColumnOptions
          columnId={id}
          columnName={name}
          onTaskAdd={() => setIsTaskAdding(true)}
        />
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="flex gap-4 flex-col mt-2 px-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Card key={task.id} card={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddTask columnId={id} />
    </div>
  );
}

export { Column };

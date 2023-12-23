import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@prisma/client";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Card } from "./card";
import { BsThreeDots } from "react-icons/bs";
import { ColumnOptions } from "./column-options";

interface ColumnProps {
  id: string;
  name: string;
  tasks: Task[];
}

function Column({ id, name, tasks }: ColumnProps) {
  const [isTaskAdding, setIsTaskAdding] = useState(false);

  return (
    <div className="w-96 p-4 bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{name}</h1>
        <ColumnOptions columnId={id} onTaskAdd={() => setIsTaskAdding(true)} />
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="flex gap-4 flex-col mt-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Card key={task.id} id={task.id} index={index} task={task.task} />
            ))}
            {provided.placeholder}
            {!isTaskAdding && (
              <Button onClick={() => setIsTaskAdding(true)}>Add a Task</Button>
            )}

            {isTaskAdding && (
              <div>
                <Input placeholder="Enter the title for this task" />
                <div className="ml-auto w-fit">
                  <Button variant={"primary"} className="w-fit mt-2">
                    Add task
                  </Button>
                  <Button
                    variant={"destructive"}
                    className="w-fit mt-2 ml-2"
                    onClick={() => setIsTaskAdding(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export { Column };

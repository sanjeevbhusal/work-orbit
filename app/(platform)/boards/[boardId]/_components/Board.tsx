"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

interface BoardProps {
  board: BoardWithColumnAndTasks;
}
import axios from "axios";
import { useRouter } from "next/navigation";
import { Column as BoardColumn } from "./Column";
import { getBoardColumns, getBoardTasks } from "@/lib/utils";
import { resetServerContext } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { AddColumn } from "./add-column";
import { BoardWithColumnAndTasks } from "@/lib/types";

// Without this function, react-beautiful-dnd doesnot work in nextjs
resetServerContext();

function Board({ board }: BoardProps) {
  const router = useRouter();

  async function updateTask({
    id,
    columnId,
    index,
  }: {
    id: string;
    columnId: string;
    index: number;
  }) {
    try {
      axios.post(`/api/task/${id}`, { columnId, index });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function onDragEnd({ destination, source, draggableId }: DropResult) {
    if (!destination) {
      return;
    }

    updateTask({
      id: draggableId,
      columnId: destination.droppableId,
      index: destination.index,
    });

    // const modifiedData = JSON.parse(JSON.stringify(data));

    // const sourceDraggable = modifiedData.tasks[source.droppableId].find(
    //   (draggable) => draggable.position === source.index
    // );

    // const destinationDraggable = modifiedData.tasks[
    //   destination.droppableId
    // ].find((draggable) => draggable.position === destination.index);

    // console.log({ source, destination });
    // console.log(sourceDraggable, destinationDraggable);

    // sourceDraggable.position = destination.index;
    // destinationDraggable.position = source.index;

    // console.log(modifiedData);

    // modifiedData.tasks[source.droppableId].sort(
    //   (a, b) => a.position - b.position
    // );

    // console.log(modifiedData);

    // setData(modifiedData);
  }

  const columns = getBoardColumns(board);
  const tasks = getBoardTasks(board);

  return (
    <div className="p-4 h-[calc(100%-44px)] overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-8 items-start h-full overflow-auto">
          {columns.map((column) => {
            return (
              <BoardColumn
                key={column.id}
                id={column.id}
                name={column.name}
                tasks={tasks[column.id]}
              />
            );
          })}

          <AddColumn boardId={board.id} />
        </div>
      </DragDropContext>
    </div>
  );
}

export { Board };

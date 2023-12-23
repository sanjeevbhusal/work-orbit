"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { Board, Column, Task } from "@prisma/client";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface BoardProps {
  board: Board & { columns: (Column & { tasks: Task[] })[] };
}
import { resetServerContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

resetServerContext();

const initialData = {
  columns: [
    { id: "rfdfadf", label: "TODO" },
    { id: "dfadsf", label: "IN-PROGRESS" },
    { id: "zdakf", label: "DONE" },
  ],
  tasks: {
    rfdfadf: [
      {
        id: "dfakjdf",
        task: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, sequi.",
        position: 0,
      },
      {
        id: "abc123",
        task: "Finish coding feature A",
        position: 1,
      },
      {
        id: "xyz789",
        task: "Write unit tests for component B",
        position: 2,
      },
      {
        id: "123xyz",
        task: "Refactor code for better performance",
        position: 3,
      },
      {
        id: "456abc",
        task: "Implement feature C",
        position: 4,
      },
    ],
    dfadsf: [
      {
        id: "def456",
        task: "Debug issue with API integration",
        position: 0,
      },
      {
        id: "ghi789",
        task: "Design UI for new dashboard",
        position: 1,
      },
      {
        id: "jkl012",
        task: "Fix bug in authentication flow",
        position: 2,
      },
    ],
    zdakf: [
      {
        id: "mno345",
        task: "Complete documentation for project",
        position: 0,
      },
      {
        id: "pqr678",
        task: "Deploy application to production",
        position: 2,
      },
    ],
  },
};

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
    console.log({ id, columnId, index });
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

    return;

    const modifiedData = JSON.parse(JSON.stringify(data));

    const sourceDraggable = modifiedData.tasks[source.droppableId].find(
      (draggable) => draggable.position === source.index
    );

    const destinationDraggable = modifiedData.tasks[
      destination.droppableId
    ].find((draggable) => draggable.position === destination.index);

    console.log({ source, destination });
    console.log(sourceDraggable, destinationDraggable);

    sourceDraggable.position = destination.index;
    destinationDraggable.position = source.index;

    console.log(modifiedData);

    modifiedData.tasks[source.droppableId].sort(
      (a, b) => a.position - b.position
    );

    console.log(modifiedData);

    setData(modifiedData);
  }

  const columns = board.columns.map((column) => ({
    id: column.id,
    name: column.name,
  }));

  const tasks = {};

  board.columns.forEach((column) => {
    tasks[column.id] = column.tasks;
  });

  console.log({ columns, tasks });

  return (
    <div className="p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-8">
          {columns.map((column: any) => {
            const columnTasks = tasks[column.id];
            console.log(tasks, column.id);
            console.log({ columnTasks: tasks[column.id] });

            return (
              <div className="w-96 p-2 bg-white" key={column.id}>
                <h1 className="text-center">{column.name}</h1>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      className="flex gap-4 flex-col mt-4"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable
                          draggableId={task.id}
                          key={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="p-2 border"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              {task.task}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export { Board };
// "use client";
// import type { NextPage } from "next";
// import React, { Component, useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const dnd: NextPage = () => {
//   const [isBrowser, setIsBrowser] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setIsBrowser(true);
//     }
//   }, []);

//   const data = [
//     {
//       id: "section-1",
//       title: "Section 1",
//     },
//     {
//       id: "section-2",
//       title: "Section 2",
//     },
//     {
//       id: "section-3",
//       title: "Section 3",
//     },
//   ];

//   return (
//     <DragDropContext>
//       <div>
//         {isBrowser ? (
//           <Droppable droppableId="droppable">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {data.map((item, index) => (
//                   <Draggable key={item.id} draggableId={item.id} index={index}>
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         {item.title}
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         ) : null}
//       </div>
//     </DragDropContext>
//   );
// };

// export { dnd as Board };

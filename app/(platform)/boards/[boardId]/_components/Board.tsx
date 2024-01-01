'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { resetServerContext } from 'react-beautiful-dnd';

import { BoardWithColumnAndCards } from '@/lib/types';
import { getBoardCards,getBoardColumns } from '@/lib/utils';

import { AddColumn } from './add-column';
import { Column as BoardColumn } from './Column';

interface BoardProps {
  board: BoardWithColumnAndCards;
}
// Without this function, react-beautiful-dnd doesnot work in nextjs
resetServerContext();

function Board({ board }: BoardProps) {
  const router = useRouter();

  async function updateCard({ id, columnId, index }: { id: string; columnId: string; index: number }) {
    try {
      axios.post(`/api/card/${id}`, { columnId, index });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  function onDragEnd({ destination, source, draggableId }: DropResult) {
    if (!destination) {
      return;
    }

    updateCard({
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
  const cards = getBoardCards(board);

  return (
    <div className="p-4 h-[calc(100%-44px)] overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-8 items-start h-full overflow-auto">
          {columns.map((column) => {
            return (
              <BoardColumn
                column={{
                  ...column,
                  boardId: board.id,
                  cards: cards[column.id],
                }}
                key={column.id}
              />
            );
          })}

          <AddColumn board={board} />
        </div>
      </DragDropContext>
    </div>
  );
}

export { Board };

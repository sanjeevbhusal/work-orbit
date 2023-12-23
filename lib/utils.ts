import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import localFont from "next/font/local";
import { BoardWithColumnAndTasks } from "./types";
import { Task } from "@prisma/client";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const headingFont = localFont({
  src: "../public/font.woff2",
});

function getBoardColumns(board: BoardWithColumnAndTasks) {
  return board.columns.map((column) => ({
    id: column.id,
    name: column.name,
  }));
}
function getBoardTasks(board: BoardWithColumnAndTasks) {
  const tasks: Record<string, Task[]> = {};

  board.columns.forEach((column) => {
    tasks[column.id] = column.tasks;
  });

  return tasks;
}

export { cn, headingFont, getBoardColumns, getBoardTasks };

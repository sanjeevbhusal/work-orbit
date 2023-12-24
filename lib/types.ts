import { Board, Column, Task } from "@prisma/client";

type BoardWithColumnAndTasks = Board & {
  columns: (Column & { tasks: Task[] })[];
};

type BoardImage = {
  description: string;
  small: string;
  big: string;
};

export type { BoardWithColumnAndTasks, BoardImage };

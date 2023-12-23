import { Board, Column, Task } from "@prisma/client";

type BoardWithColumnAndTasks = Board & {
  columns: (Column & { tasks: Task[] })[];
};

export { BoardWithColumnAndTasks };

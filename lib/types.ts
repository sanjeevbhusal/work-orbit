import { Board, Column, Card } from "@prisma/client";

type BoardWithColumnAndCards = Board & {
  columns: (Column & { cards: Card[] })[];
};

type BoardImage = {
  description: string;
  small: string;
  big: string;
};

export type { BoardWithColumnAndCards, BoardImage };

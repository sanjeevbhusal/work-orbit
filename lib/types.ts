import { Board, Card,Column } from '@prisma/client';

type BoardWithColumnAndCards = Board & {
  columns: (Column & { cards: Card[] })[];
};

type ColumnWithCards = Column & { cards: Card[] };

type BoardImage = {
  description: string;
  small: string;
  large: string;
};

export type { BoardImage, BoardWithColumnAndCards, ColumnWithCards };

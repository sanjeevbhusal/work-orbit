import localFont from 'next/font/local';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Card } from '@prisma/client';

import { BoardWithColumnAndCards } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const headingFont = localFont({
  src: '../public/font.woff2',
});

function getBoardColumns(board: BoardWithColumnAndCards) {
  return board.columns.map((column) => ({
    id: column.id,
    index: column.index,
    name: column.name,
    description: column.description,
  }));
}
function getBoardCards(board: BoardWithColumnAndCards) {
  const cards: Record<string, Card[]> = {};

  board.columns.forEach((column) => {
    cards[column.id] = column.cards;
  });

  return cards;
}

export { cn, getBoardCards, getBoardColumns, headingFont };

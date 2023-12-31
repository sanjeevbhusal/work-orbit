import Image from 'next/image';
import Link from 'next/link';

import { getBoards } from '@/actions/getBoards';
import { PageHeading } from '@/components/page-heading';

import { CreateBoard } from './_components/create-board';
import { ListBoard } from './_components/list-board';
import { NavBar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';

export default async function BoardPage() {
  const boards = await getBoards();

  return (
    <div className="h-screen">
      <NavBar />
      <div className="px-4 h-[calc(100%-65px)] mx-auto max-w-7xl flex">
        <Sidebar />
        <div className="grow py-4 pl-8">
          <div className="flex items-center justify-between">
            <PageHeading>Your Boards</PageHeading>
            <CreateBoard />
          </div>
          <div className="mt-4">
            <ListBoard boards={boards} />
          </div>
        </div>
      </div>
    </div>
  );
}

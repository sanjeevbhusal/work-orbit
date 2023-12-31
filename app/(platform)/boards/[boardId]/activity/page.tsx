import { PageHeading } from "@/components/page-heading";
import { PageSubheading } from "@/components/page-subheading";
import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ActivityType } from "@prisma/client";
import dayjs from "dayjs";
import { getBoardActivity } from "@/actions/getBoardActivity";

interface Params {
  params: {
    boardId: string;
  };
}

type Activity = {
  Activity: {} & {
    id: string;
    createdAt: Date;
    userId: string | null;
    subType: "BOARD";
  };
} & {
  id: string;
  activityId: string;
  boardId: string;
  activityType: ActivityType;
  currentName: string | null;
  previousName: string | null;
};

function getMessage(message: Activity) {
  if (message.activityType === ActivityType.CREATE) {
    return <p>created this board</p>;
  }
  if (message.activityType === ActivityType.UPDATE) {
    return (
      <p>
        renamed this board from{" "}
        <span className="font-semibold">{message.previousName}</span> to{" "}
        <span className="font-semibold">{message.currentName}</span>
      </p>
    );
  }
}

export default async function ActivityPage({ params: { boardId } }: Params) {
  const activities = await getBoardActivity(boardId);

  return (
    <div className="py-4 px-8">
      <PageHeading>Activity</PageHeading>
      <PageSubheading className="mt-2">
        See all the activities for this board{" "}
      </PageSubheading>
      <div className="mt-8 flex flex-col gap-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="py-2 px-4 border rounded-lg bg-slate-200 flex gap-4 items-center"
          >
            <div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col">
              <div className="text-sm flex">
                <span className="font-semibold">Sanjeev Bhusal</span>
                <div className="ml-1">{getMessage(activity)}</div>
              </div>
              <p className="text-xs">{dayjs().format("DD MMM, YYYY")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

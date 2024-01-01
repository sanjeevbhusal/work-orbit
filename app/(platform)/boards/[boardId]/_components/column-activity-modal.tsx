import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ActivitySubType, ActivityType, Column } from '@prisma/client';

interface ColumnActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  column: Column;
}

type Activity = {
  Activity: {
    id: string;
    createdAt: Date;
    userId: string | null;
    subType: ActivitySubType;
  };
} & {
  id: string;
  activityId: string;
  columnId: string;
  activityType: ActivityType;
  currentName: string | null;
  previousName: string | null;
};

function ColumnActivityModal({ open, onOpenChange, column }: ColumnActivityModalProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    async function fetchColumnActivity() {
      try {
        const response = await axios.get(`/api/column/${column.id}/activities`);
        const activities = response.data.data;
        setActivities(activities);
      } catch (error) {}
    }

    fetchColumnActivity();
  }, [column]);

  function getMessage(message: Activity) {
    if (message.activityType === ActivityType.CREATE) {
      return <p>created this column</p>;
    }
    if (message.activityType === ActivityType.UPDATE) {
      return (
        <p>
          renamed this column from <span className="font-semibold">{message.previousName}</span> to{' '}
          <span className="font-semibold">{message.currentName}</span>
        </p>
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[32rem] w-fit max-w-none">
        <DialogHeader>
          <DialogTitle className="font-semibold text-base">Activity for Column {column.name} </DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-4">
          {activities.map((activity) => (
            <div key={activity.id} className="py-2 px-4 border rounded-lg bg-slate-200 flex gap-4 items-center">
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
                <p className="text-xs">{dayjs().format('DD MMM, YYYY')}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ColumnActivityModal };

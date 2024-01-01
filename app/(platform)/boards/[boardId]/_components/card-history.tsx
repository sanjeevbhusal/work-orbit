import axios from 'axios';
import dayjs from 'dayjs';
import { Loader2 } from 'lucide-react';

import { SectionTitle } from '@/components/section-title';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ActivitySubType, ActivityType, Card } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

type Activity = {
  Activity: {
    id: string;
    createdAt: Date;
    userId: string | null;
    subType: ActivitySubType;
  };
  previousColumn: {
    id: string;
    name: string;
    description: string | null;
    boardId: string;
  } | null;
  currentColumn: {
    id: string;
    name: string;
    description: string | null;
    boardId: string;
  };
} & {
  id: string;
  activityId: string;
  cardId: string;
  activityType: ActivityType;
  previousColumnId: string | null;
  currentColumnId: string;
};

interface CardInformationProps {
  card: Card;
}

async function fetchCardActivities(card: any) {
  const response = await axios.get(`/api/card/${card.id}/activities`);
  const activities = response.data.data;
  return activities;
}

function CardHistory({ card }: CardInformationProps) {
  const {
    data: activities,
    isLoading,
    error,
  } = useQuery<Activity[]>({
    queryKey: [card, 'activities'],
    queryFn: async () => {
      const response = await axios.get(`/api/card/${card.id}/activities`);
      return response.data.data;
    },
    retry: false,
  });

  return (
    <div>
      <SectionTitle>Card History</SectionTitle>
      <Separator className="my-4" />
      {isLoading && <Loader2 className="animate-spin mx-auto" />}
      {error && <p className="text-neutral-500">Oops!! Something went wrong while fetching card&apos;s history.</p>}
      <div className="flex flex-col gap-4 py-2">
        {activities?.map((activity) => (
          <div key={activity.id} className="flex gap-4 border py-2 px-4 rounded-lg">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <p className="text-sm">
                <span className="font-semibold">Sanjeev Bhusal</span>

                {activity.previousColumnId ? (
                  <>
                    {' '}
                    moved card from <span className="font-semibold">{activity.previousColumn?.name}</span> to
                    <span className="font-semibold"> {activity.currentColumn.name}</span>
                  </>
                ) : (
                  <>
                    {' '}
                    created card in <span className="font-semibold"> {activity.currentColumn.name}</span>
                  </>
                )}
              </p>
              <p className="text-xs text-neutral-500">{dayjs(activity.Activity.createdAt).format('DD MMMM, YYYY')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CardHistory };

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Participant } from "@/types/responses";

type RightPanelProps = {
  title: string;
  description: string | undefined;
  countdown: string;
  participants: Participant[];
};

const calculateTimeLeft = (countdown: string) => {
  const now = dayjs();
  const end = dayjs(countdown);
  const diff = end.diff(now);

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const duration = dayjs.duration(diff);

  return {
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  };
};
export const RightPanel: React.FC<RightPanelProps> = ({
  title,
  description,
  countdown,
  participants,
}) => {

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(countdown));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(countdown));
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="p-4">
      <div className="border-2 border-black bg-gray-100 p-4 rounded-md shadow-md">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <p className="text-md text-gray-700">{description}</p>
        <p className="text font-bold mb-2">Do końca głosowania:</p>
        <p className="text-md text-black">
          {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
        </p>
        <p className="text font-bold mb-2">Uczestnicy:</p>
        <div className="flex flex-wrap gap-2">
          {participants?.map((participant) => (
            <span
              key={participant.participant_id}
              className="p-2 bg-amber-100 rounded-md shadow-sm"
            >
              {participant.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

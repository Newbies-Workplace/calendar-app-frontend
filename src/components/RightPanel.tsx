import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

type RightPanelProps = {
  title: string;
  description: string | undefined;
  countdown: string;
};

export const RightPanel: React.FC<RightPanelProps> = ({
  title,
  description,
  countdown,
}) => {
  const calculateTimeLeft = () => {
    const now = dayjs();
    const end = dayjs(countdown);
    const diff = end.diff(now);

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    // Używamy dayjs, by zwrócić obiekt z jednostkami czasu
    const duration = dayjs.duration(diff);

    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="p-4">
      <div className="border-2 border-black bg-gray-100 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        {description && <p className="text-md text-gray-700">{description}</p>}
        <p className="text-md text-black">Do końca głosowania:</p>
        <p>{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</p>
      </div>
    </div>
  );
};

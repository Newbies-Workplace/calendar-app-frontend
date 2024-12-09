import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Participant } from "@/types/responses";
import { EndVoteModal } from "@/components/EndVoteModal";
import { Modal } from "./Modal";

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
  const [showEndVoteModal, setShowEndVoteModal] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(countdown));
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const openModal = () => setShowEndVoteModal(true);
  const closeModal = () => setShowEndVoteModal(false);

  const handleFinishVote = () => {
    console.log("Głosowanie zakończone");
    closeModal();
  };

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {isPanelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={togglePanel}
        />
      )}

<div
  className={`h-full bg-gray-100 transition-all duration-300 ease-in-out z-20 overflow-hidden border-2 border-gray-800 ${
    window.innerWidth >= 1024 ? "fixed top-0 right-0 w-2/3" : `fixed top-0 right-0 ${isPanelOpen ? "w-2/3" : "w-0"}`
  } lg:w-1/3`}
>
        <div className=" p-4 ">
          <h1 className="text-xl font-bold mb-2">{title}</h1>
          <p className="text-md text-gray-700">{description}</p>
          <p className="text font-bold mb-2">Do końca głosowania:</p>
          <p className="text-md text-black">
            {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
          </p>
          <p className="text font-bold mb-2">Uczestnicy:</p>
          <div className="flex flex-wrap gap-2">
            {participants.map((participant) => (
              <span
                key={participant.participant_id}
                className="p-2 bg-white border-2 border-black rounded-md shadow-md"
              >
                {participant.name}
              </span>
            ))}
          </div>
          <button
            className="bg-gray-800 text-white hover:bg-gray-600 rounded-lg mt-4 p-3"
            onClick={openModal}
          >
            Zakończ głosowanie
          </button>
        </div>
        {showEndVoteModal && (
          <Modal onDismiss={closeModal}>
            <EndVoteModal onDismiss={closeModal} onFinish={handleFinishVote} />
          </Modal>
        )}
      </div>

      <button
  onClick={togglePanel}
  className={`fixed top-1.5 right-0 bg-gray-800 text-white p-1.5 rounded-l-lg z-30 transition-all duration-300 ease-in-out ${isPanelOpen ? "rotate-360" : ""} lg:hidden`}
  style={{
    right: isPanelOpen ? "calc(66.66%)" : "0",
  }}
>
  {isPanelOpen ? "→" : "←"}
</button>

    </div>
  );
};

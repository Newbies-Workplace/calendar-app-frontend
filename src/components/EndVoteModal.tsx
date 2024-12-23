import Button from "@/components/Button";
import React from "react";

interface EndVoteModalProps {
  onDismiss: () => void;
  onFinish: () => void;
}

export const EndVoteModal: React.FC<EndVoteModalProps> = ({
  onDismiss,
  onFinish,
}) => (
  <>
    <h1 className="text-left text-4xl text-black pb-7">
      Czy na pewno chcesz zakończyć głosowanie?
    </h1>
    <hr className="flex-grow border-t-2 border-gray-400 rounded-full" />
    <div className="flex justify-end gap-2 text-white">
      <Button className="main" onClick={onDismiss}>
        Wróć
      </Button>
      <Button className="main" onClick={onFinish}>
        Zakończ
      </Button>
    </div>
  </>
);

import Button from "@/components/Button";
import React from "react";

interface HelpModalProps {
  onDismiss: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onDismiss }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <div className="min-w-12 min-h-12 flex flex-col justify-center items-center border-2 border-black rounded-lg bg-white p-10">
      <h1 className="text-black pb-10">Pomoc....</h1>
      <Button onClick={onDismiss}>Zamknij</Button>
    </div>
  </div>
);

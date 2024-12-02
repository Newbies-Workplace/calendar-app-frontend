import Button from "@/components/Button";
import React from "react";

interface HelpModalProps {
  onDismiss: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onDismiss }) => (
    <>
      <h1 className="text-black pb-10">Pomoc....</h1>
      <Button onClick={onDismiss}>Zamknij</Button>
    </>
);

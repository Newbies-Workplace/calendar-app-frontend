import Button from "@/components/Button";
import React from "react";

interface HelpModalProps {
  onDismiss: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onDismiss }) => (
  <>
    <h1 className="text-black pb-10 justify-center">Pomoc</h1>
    <p>Shift+LPM - dostępny</p>
    <p>Ctrl+LPM - niedostępny</p>
    <Button onClick={onDismiss}>Zamknij</Button>
  </>
);

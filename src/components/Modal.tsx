import Button from "@/components/Button";
import React, { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
  onDismiss: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.onDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);

  return (
    <div className="fixed inset-0 flex items-center justify-center text-black">
      <div
        onClick={props.onDismiss}
        className="fixed inset-0 bg-black bg-opacity-80"
      />
      <div className="relative bg-gray-200 p-4 rounded-md max-w-lg w-full">
        {props.children}
        <div className="absolute top-2 right-2">
          <Button className="text-white" onClick={props.onDismiss}>
            x
          </Button>
        </div>
      </div>
    </div>
  );
};

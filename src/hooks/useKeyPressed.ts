import React, { useEffect } from "react";
import { useCallback } from "react";

export const useKeyPressed = (key: string): boolean => {
  const [pressed, setPressed] = React.useState(false);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === key) {
        setPressed(true);
      }
    },
    [key],
  );

  const handleKeyUp = useCallback(
    (event) => {
      if (event.key === key) {
        setPressed(false);
      }
    },
    [key],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyPress, handleKeyUp]);
  return pressed;
};

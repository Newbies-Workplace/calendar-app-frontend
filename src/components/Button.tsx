import React from 'react';
import { Button as MaterialButton } from "@material-tailwind/react";
import { cn } from './cn';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  color?: "amber" | "blue" | "red" | "green";
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "outlined", size = "md", color = "amber", className}) => {
  return (
    <button onClick={onClick}className={cn(`bg-red-500 ${color}`, className)}>
     {children}
    </button>
  );
};
export default Button;
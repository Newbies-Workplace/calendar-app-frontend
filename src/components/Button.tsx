import React from 'react';
import { cn } from './cn';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  color?: "black" | "blue" | "red" | "green";
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "outlined", size = "md", className}) => {
  return (
    <button onClick={onClick}
    className={cn(
      "transition ease-in-out duration-500",
      "font-semibold rounded-xl",
      "mt-[-60px]",
      size === "md" && "px-10 py-10 text-base",
      variant === "outlined" && "border border-gray-300 text-gray-700 bg-white hover:bg-black-100",
      variant === "filled" && "shadow-lg",
      className
     )}>
     {children}
    </button>
  );
};
export default Button;
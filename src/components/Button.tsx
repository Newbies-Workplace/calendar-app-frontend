import React from "react";
import { cn } from "../util/cn";

interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	variant?: "filled" | "outlined";
	size?: "sm" | "md" | "lg";
	className?: string;
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	variant = "outlined",
	size = "md",
	className,
}) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				"transition ease-in-out duration-200 font-semibold rounded-xl",
				size === "md" && "p-2 text-base",
				variant === "outlined" &&
					"border border-gray-300 text-white bg-gray-600 hover:bg-gray-500",
				variant === "filled" && "shadow-lg",
				className,
			)}
		>
			{children}
		</button>
	);
};
export default Button;

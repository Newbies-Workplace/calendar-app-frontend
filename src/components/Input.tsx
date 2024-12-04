import { cn } from "@/util/cn";
import React, { forwardRef, Ref } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
    error?: string;
    multiline?: boolean;
    placeholder?: string;
}

export const Input = forwardRef(
    ({ label, error, multiline, placeholder, ...rest }: InputProps, ref: Ref<HTMLInputElement | HTMLTextAreaElement>) => {
        const Component = multiline ? "textarea" : "input";

        return (
            <div className="flex flex-col text-black gap-1">
                {label && <label htmlFor={rest.name}>{label}</label>}
                <Component
                    className={cn(
                        "border border-black rounded-md p-2",
                        multiline ? "resize-y" : "resize-none",
                        error && "border-red-500"
                    )}
                    placeholder={placeholder}
                    {...rest}
                    ref={ref}
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
            </div>
        );
    }
);

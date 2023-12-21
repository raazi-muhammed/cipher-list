import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { cn } from "../../utils/className";

export const inputVariants = cva("p-2 rounded px-4", {
    variants: {
        variant: {
            default: "text-foreground bg-background-accent",
            outline: "bg-background",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface InputPropType
    extends InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {}

const Input = ({ className, variant, ...props }: InputPropType) => {
    return (
        <input
            className={cn(inputVariants({ variant, className }))}
            {...props}
        />
    );
};

export default Input;

import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/className";

export const buttonVariants = cva(
    "rounded px-4 p-2 outline-none border-2  border-primary focus:border-primary focus:outline-0",
    {
        variants: {
            variant: {
                default: "bg-primary",
                muted: "bg-background-accent border-none",
                outline: "bg-background",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface ButtonPropType
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = ({ children, className, variant, ...props }: ButtonPropType) => {
    return (
        <button
            className={cn(buttonVariants({ variant, className }))}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

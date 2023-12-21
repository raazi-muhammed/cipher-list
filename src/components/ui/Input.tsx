import React from "react";

type InputType = {
    type: string;
    value: any;
    setValue: React.Dispatch<React.SetStateAction<any>>;
};

const Input = ({ type, value, setValue }: InputType) => {
    return (
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type={type}
            className="text-foreground bg-background-accent p-2 rounded-lg"
        />
    );
};

export default Input;

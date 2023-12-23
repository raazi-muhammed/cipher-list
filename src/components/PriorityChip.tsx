import { PriorityTypes } from "../types/todo";

type PriorityChipType = {
    priority: PriorityTypes | null;
};
const PriorityChip = ({ priority }: PriorityChipType): JSX.Element | null => {
    if (!priority) return null;
    return (
        <>
            <span
                className={`dot ${
                    priority === PriorityTypes.HIGH
                        ? "bg-red-500"
                        : priority === PriorityTypes.MEDIUM
                        ? "bg-orange-400"
                        : priority === PriorityTypes.LOW
                        ? "bg-yellow-300"
                        : ""
                }`}
            ></span>
            <p>{`${PriorityTypes[priority].toLowerCase()} priority`}</p>
        </>
    );
};

export default PriorityChip;

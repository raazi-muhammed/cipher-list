import { PriorityTypes } from "../types/todo";

type ChipSeparatorType = {
    doWhen: string | null;
    priority: PriorityTypes | null;
};
const ChipSeparator = ({
    doWhen,
    priority,
}: ChipSeparatorType): JSX.Element | null => {
    if (!doWhen || !priority) return null;
    return <p className="me-1">,</p>;
};

export default ChipSeparator;

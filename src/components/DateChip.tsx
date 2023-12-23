import moment from "moment";

type DateChipType = {
    doWhen: string | null;
};
const DateChip = ({ doWhen }: DateChipType): JSX.Element | null => {
    if (!doWhen) return null;
    return <p>{moment(doWhen).endOf("day").fromNow()}</p>;
};

export default DateChip;

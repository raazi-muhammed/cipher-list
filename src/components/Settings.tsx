import { Button } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import toast from "react-hot-toast";
import { TodoItem } from "../types/todo";
import { SortOptions } from "../types/viewTypes";
import ERROR_MESSAGES from "../utils/errorMessages";

type SettingsType = {
    showCompleted: boolean;
    setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const Settings = ({
    showCompleted,
    setShowCompleted,
    setRefresh,
}: SettingsType): JSX.Element => {
    const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.CREATED_AT);

    const { toDoList, setToDoList, saveToLocalStorage, clearLocalStorage } =
        useContext(DataContext);
    if (
        !toDoList ||
        !setToDoList ||
        !saveToLocalStorage ||
        !clearLocalStorage
    ) {
        return <p>{ERROR_MESSAGES.DATA_CONTEXT_LOADING}</p>;
    }

    const handleClearAll = () => {
        setToDoList([]);
        clearLocalStorage();
        toast.success("Todos Cleared");
        setRefresh((r) => !r);
    };

    const sortByField = (sortBy: SortOptions) => {
        const DEFAULT_STRING = "~~"; // used this because of hight asci values
        const newToDoList = structuredClone(toDoList) as TodoItem[];
        return newToDoList.sort((a: TodoItem, b: TodoItem) => {
            const _a: string =
                a[sortBy]?.toString().toLowerCase() || DEFAULT_STRING;
            const _b: string =
                b[sortBy]?.toString().toLowerCase() || DEFAULT_STRING;

            if (_a < _b) return sortBy === SortOptions.PRIORITY ? 1 : -1;
            if (_a > _b) return sortBy === SortOptions.PRIORITY ? -1 : 1;
            return 0;
        });
    };

    const handleChangeSortBy = (e: any) => {
        const sortBy = e.target.value as SortOptions | SortOptions.CREATED_AT;
        setSortBy(sortBy);

        const sortedList = sortByField(sortBy);

        setToDoList(sortedList);
        saveToLocalStorage();
        setRefresh((r) => !r);
    };

    return (
        <Popover className="dark text-foreground" placement="bottom-end">
            <PopoverTrigger>
                <Button
                    className="my-auto"
                    size="sm"
                    radius="full"
                    isIconOnly
                    variant="flat"
                >
                    <img src="/icons/three-dot.svg" alt="" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-2">
                <Button
                    color="danger"
                    variant="light"
                    className="w-full"
                    onClick={handleClearAll}
                >
                    <p className="w-full text-start">Clear All</p>
                </Button>
                <Select
                    labelPlacement="outside"
                    value={sortBy}
                    onChange={handleChangeSortBy}
                    defaultSelectedKeys={[sortBy.toString()]}
                    label=""
                >
                    <SelectItem
                        key={SortOptions.CREATED_AT}
                        value={SortOptions.CREATED_AT}
                    >
                        SortBy: CreatedAt
                    </SelectItem>
                    <SelectItem key={SortOptions.NAME} value={SortOptions.NAME}>
                        SortBy: Name
                    </SelectItem>
                    <SelectItem
                        key={SortOptions.DUE_DATE}
                        value={SortOptions.DUE_DATE}
                    >
                        SortBy: Due Date
                    </SelectItem>

                    <SelectItem
                        key={SortOptions.PRIORITY}
                        value={SortOptions.PRIORITY}
                    >
                        SortBy: Priority
                    </SelectItem>
                </Select>
                <div className="flex align-middle h-12 px-4 hover:bg-default-100 rounded-xl ">
                    <p className="my-auto me-4">Show Completed</p>
                    <Switch
                        size="sm"
                        onChange={(e) => setShowCompleted(e.target.checked)}
                        defaultSelected={showCompleted}
                        aria-label="show completed"
                    ></Switch>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default Settings;

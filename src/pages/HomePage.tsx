import AddToDo from "../components/AddToDo";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import { Button } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import toast from "react-hot-toast";
import TodoItemsList from "../components/TodoItemsList";
import { Select, SelectItem } from "@nextui-org/react";
import { TodoItem } from "../types/todo";

enum SortOptions {
    PRIORITY = "priority",
    NAME = "name",
    CREATED_AT = "createdAt",
    DUE_DATE = "doWhen",
}
const HomePage = (): JSX.Element => {
    const [refresh, setRefresh] = useState<boolean>(false);
    const [showCompleted, setShowCompleted] = useState<boolean>(true);
    const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.CREATED_AT);
    const { toDoList, setToDoList, saveToLocalStorage } =
        useContext(DataContext);
    if (!toDoList || !setToDoList || !saveToLocalStorage) return <p>Error</p>;

    const handleClearAll = () => {
        setToDoList([]);
        saveToLocalStorage();
        toast.success("cleared");
    };

    const handleChangeSortBy = (e: any) => {
        setSortBy(e.target.value as SortOptions | SortOptions.CREATED_AT);
        const sortBy = e.target.value as SortOptions;

        const sortedList = toDoList.sort((a: TodoItem, b: TodoItem) => {
            const _a: string = a[sortBy]?.toString().toLowerCase() || "~~";
            const _b: string = b[sortBy]?.toString().toLowerCase() || "~~";

            if (_a < _b) return sortBy === SortOptions.PRIORITY ? 1 : -1;
            if (_a > _b) return sortBy === SortOptions.PRIORITY ? -1 : 1;
            return 0;
        });
        setToDoList(sortedList);
        saveToLocalStorage();
    };

    return (
        <main className="p-4 max-w-screen-md mx-auto">
            <header className="flex justify-between align-top pr-2">
                <h1 className="text-4xl text-start font-bold mb-6">
                    Todo list
                </h1>
                <Popover
                    className="dark text-foreground"
                    placement="bottom-end"
                >
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
                            <SelectItem
                                key={SortOptions.NAME}
                                value={SortOptions.NAME}
                            >
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
                                onChange={(e) =>
                                    setShowCompleted(e.target.checked)
                                }
                                defaultSelected={showCompleted}
                                aria-label="show completed"
                            ></Switch>
                        </div>
                    </PopoverContent>
                </Popover>
            </header>
            <TodoItemsList
                setRefresh={setRefresh}
                showCompleted={showCompleted}
            />
            <section className="fixed bottom-0 right-0 z-50">
                <AddToDo setRefresh={setRefresh} />
            </section>
        </main>
    );
};

export default HomePage;

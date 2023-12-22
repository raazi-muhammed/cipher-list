import AddToDo from "../components/AddToDo";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import { Button } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import toast from "react-hot-toast";
import TodoItemsList from "../components/TodoItemsList";

const HomePage = (): JSX.Element => {
    const [refresh, setRefresh] = useState<boolean>(false);
    const [showCompleted, setShowCompleted] = useState<boolean>(true);
    const { toDoList, setToDoList, saveToLocalStorage } =
        useContext(DataContext);
    if (!toDoList || !setToDoList || !saveToLocalStorage) return <p>Error</p>;

    const handleClearAll = () => {
        setToDoList([]);
        saveToLocalStorage();
        toast.success("cleared");
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

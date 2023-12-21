import AddToDo from "../components/AddToDo";
import TodoListItem from "../components/TodoListItem";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import { Button } from "@nextui-org/react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import toast from "react-hot-toast";

const HomePage = (): JSX.Element => {
    const [refresh, setRefresh] = useState<boolean>(false);
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
                <Dropdown className="dark text-foreground">
                    <DropdownTrigger>
                        <Button
                            className="my-auto"
                            size="sm"
                            radius="full"
                            isIconOnly
                            variant="flat"
                        >
                            <img src="/icons/three-dot.svg" alt="" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="mark-done">Settings</DropdownItem>
                        <DropdownItem key="mark-done">
                            Show Completed
                        </DropdownItem>
                        <DropdownItem
                            onClick={handleClearAll}
                            key="delete"
                            className="text-danger"
                            color="danger"
                        >
                            Clear All
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </header>
            <section className="flex flex-col gap-4 mb-28">
                {toDoList?.length <= 0 ? (
                    <p className="opacity-50 mt-10 mx-auto">No items</p>
                ) : null}
                {toDoList.map((todo, i) => (
                    <TodoListItem setRefresh={setRefresh} key={i} todo={todo} />
                ))}
            </section>
            <footer className="fixed bottom-0 right-0 z-50">
                <AddToDo setRefresh={setRefresh} />
            </footer>
        </main>
    );
};

export default HomePage;

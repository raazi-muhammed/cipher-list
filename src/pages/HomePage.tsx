import AddToDo from "../components/AddToDo";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import TodoItemsList from "../components/TodoItemsList";
import Settings from "../components/Settings";
import ERROR_MESSAGES from "../utils/errorMessages";

const HomePage = (): JSX.Element => {
    const setRefresh = useState<boolean>(false)[1];
    const [showCompleted, setShowCompleted] = useState<boolean>(true);

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

    return (
        <main className="p-4 max-w-screen-md mx-auto">
            <header className="flex justify-between align-top pr-2">
                <h1 className="text-4xl text-start font-bold mb-6">
                    Todo list
                </h1>
                <Settings
                    setRefresh={setRefresh}
                    showCompleted={showCompleted}
                    setShowCompleted={setShowCompleted}
                />
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

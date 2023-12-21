import AddToDo from "../components/AddToDo";
import TodoListItem from "../components/TodoListItem";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";

const HomePage = (): JSX.Element => {
    const [refresh, setRefresh] = useState<boolean>(false);
    const { toDoList } = useContext(DataContext);
    if (!toDoList) return <p>Error</p>;

    return (
        <main className="p-4 max-w-screen-md mx-auto">
            <header>
                <h1 className="text-4xl text-start font-bold mb-2">
                    Todo list
                </h1>
            </header>
            <section className="flex flex-col gap-4 mb-28">
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

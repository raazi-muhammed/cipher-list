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
            <section className="grid gap-2">
                {toDoList.map((todo, i) => (
                    <TodoListItem key={i} todo={todo} />
                ))}
            </section>
            <footer className="fixed bottom-4 right-4">
                <AddToDo setRefresh={setRefresh} />
            </footer>
        </main>
    );
};

export default HomePage;

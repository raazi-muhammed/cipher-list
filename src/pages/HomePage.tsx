import AddToDo from "../components/AddToDo";
import TodoListItem from "../components/TodoListItem";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";

const HomePage = (): JSX.Element => {
    const [refresh, setRefresh] = useState<boolean>(false);
    const { toDoList } = useContext(DataContext);
    if (!toDoList) return <p>Error</p>;

    return (
        <main>
            <header>
                <h1>Todo list</h1>
            </header>
            <section className="grid gap-2">
                {toDoList.map((todo, i) => (
                    <TodoListItem key={i} todo={todo} />
                ))}
            </section>
            <footer>
                <AddToDo setRefresh={setRefresh} />
            </footer>
        </main>
    );
};

export default HomePage;

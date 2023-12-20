import { TodoItem } from "../types/todo";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
type TodoListItemType = {
    todo: TodoItem;
};
const TodoListItem = ({ todo }: TodoListItemType): JSX.Element => {
    const { handleCheck } = useContext(DataContext);
    if (!handleCheck) return <p>Error</p>;

    return (
        <section className="flex gap-2 bg-background-accent rounded p-4">
            <input
                onChange={() => handleCheck(todo.id)}
                type="checkbox"
                checked={todo.checked}
                id={todo.id}
            />
            <label htmlFor={todo.id}>{todo.name}</label>
        </section>
    );
};

export default TodoListItem;

import { TodoItem } from "../types/todo";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import moment from "moment";
import Button from "./ui/button";
import toast from "react-hot-toast";

type TodoListItemType = {
    todo: TodoItem;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const TodoListItem = ({ todo, setRefresh }: TodoListItemType): JSX.Element => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const { toDoList, setToDoList, saveToLocalStorage } =
        useContext(DataContext);

    if (!toDoList || !setToDoList || !saveToLocalStorage) return <p>Error</p>;

    const updateTodoList = (values: TodoItem[]) => {
        setToDoList(values);
        setRefresh((curr) => !curr);
        saveToLocalStorage();
    };
    const handleDelete = () => {
        const todoId = todo.id;
        let updatedTodo = toDoList.filter((todo) => {
            if (todo.id !== todoId) return todo;
        });
        setShowMenu(false);
        updateTodoList(updatedTodo);
        toast.success("item removed");
    };

    const handleCheck = () => {
        const todoId = todo.id;
        toDoList.map((todo) => {
            if (todo.id === todoId) todo.checked = !todo.checked;
            return todo;
        });
        setShowMenu(false);
        updateTodoList(toDoList);
    };

    return (
        <section
            className={`flex gap-4 bg-background-accent rounded p-4 relative ${
                todo.checked ? "opacity-50" : ""
            }`}
        >
            <input
                className="appearance-none w-5 h-5 my-auto rounded-full border-2 border-primary bg-background checked:bg-primary"
                onChange={handleCheck}
                type="checkbox"
                checked={todo.checked}
                id={todo.id}
            />
            <section className="text-start my-auto">
                <label htmlFor={todo.id}>{todo.name}</label>
                {todo?.doWhen ? (
                    <p className="text-xs opacity-60">
                        {moment(todo.doWhen).endOf("day").fromNow()}
                    </p>
                ) : null}
            </section>

            <button
                className="ms-auto me-0"
                onClick={() => setShowMenu((curr) => !curr)}
            >
                ...
            </button>

            {showMenu ? (
                <section className="bg-background rounded grid gap-2 p-2 absolute top-0 right-16 z-50 w-32">
                    <Button variant="muted" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="muted" onClick={handleCheck}>
                        Mark Done
                    </Button>
                </section>
            ) : null}
        </section>
    );
};

export default TodoListItem;

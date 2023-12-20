import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "../types/todo";

const AddToDo = ({
    setRefresh,
}: {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [todoInput, setTodoInput] = useState<string>("");
    const { toDoList, setToDoList } = useContext(DataContext);
    if (!toDoList || !setToDoList) return <p>Error</p>;

    const addTodoItem = (todoName: string) => {
        const toDoToAdd: TodoItem = {
            id: uuidv4(),
            name: todoName,
            checked: false,
        };
        toDoList.push(toDoToAdd);
        setToDoList(toDoList);
    };

    const handleAddTodo = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!todoInput) {
            alert("Invalid todo");
            return;
        }

        addTodoItem(todoInput);

        setTodoInput("");
        setRefresh((curr) => !curr);
    };

    return (
        <form onSubmit={handleAddTodo}>
            <input
                className="text-background"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                type="text"
            />
            <button>Add</button>
        </form>
    );
};

export default AddToDo;

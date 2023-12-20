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
    const { toDoList, setToDoList, saveToLocalStorage } =
        useContext(DataContext);
    if (!toDoList || !setToDoList || !saveToLocalStorage) return <p>Error</p>;

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
        saveToLocalStorage();
    };

    return (
        <form onSubmit={handleAddTodo}>
            <div className="flex gap-4 justify-center">
                <input
                    className="text-foreground bg-background-accent p-2 rounded-lg"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    type="text"
                />
                <button className="bg-primary rounded px-4 p-2 outline-none border-0 focus:border-primary focus:outline-0">
                    Add
                </button>
            </div>
        </form>
    );
};

export default AddToDo;

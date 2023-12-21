import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "../types/todo";
import ToDoForm from "./ToDoForm";

type AddToDoType = {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddToDo = ({ setRefresh }: AddToDoType) => {
    const [todoInput, setTodoInput] = useState<string>("");
    const [showForm, setShowForm] = useState<boolean>(false);
    const { toDoList, setToDoList, saveToLocalStorage } =
        useContext(DataContext);
    if (!toDoList || !setToDoList || !saveToLocalStorage) return <p>Error</p>;

    const addTodoItem = (todoName: string) => {
        const toDoToAdd: TodoItem = {
            id: uuidv4(),
            name: todoName,
            checked: false,
            doWhen: null,
        };
        toDoList.push(toDoToAdd);
        setToDoList(toDoList);
    };

    const handleAddTodo = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!todoInput) {
            setShowForm(true);
            return;
        }

        addTodoItem(todoInput);

        setTodoInput("");
        setRefresh((curr) => !curr);
        saveToLocalStorage();
    };

    return (
        <>
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
            {showForm ? (
                <ToDoForm setRefresh={setRefresh} setShowForm={setShowForm} />
            ) : null}
        </>
    );
};

export default AddToDo;

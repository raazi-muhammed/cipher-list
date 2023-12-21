import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "../types/todo";
import ToDoForm from "./ToDoForm";
import Input from "./ui/Input";
import Button from "./ui/button";
import toast from "react-hot-toast";

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
        toast.success("added");
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
                    <Input
                        value={todoInput}
                        onChange={(e) => setTodoInput(e.target.value)}
                        type="text"
                    />
                    <Button>Add</Button>
                </div>
            </form>
            {showForm ? (
                <ToDoForm setRefresh={setRefresh} setShowForm={setShowForm} />
            ) : null}
        </>
    );
};

export default AddToDo;

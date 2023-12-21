import React, { useContext, useState } from "react";
import Input from "./ui/Input";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "../types/todo";
import Button from "./ui/button";

type ToDoFormType = {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const ToDoForm = ({ setShowForm, setRefresh }: ToDoFormType) => {
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const { toDoList, setToDoList, saveToLocalStorage } =
        useContext(DataContext);

    if (!toDoList || !setToDoList || !saveToLocalStorage) return <p>Error</p>;

    const addTodoItem = (todoName: string, todoDate: Date | null) => {
        const toDoToAdd: TodoItem = {
            id: uuidv4(),
            name: todoName,
            checked: false,
            doWhen: todoDate,
        };
        toDoList.push(toDoToAdd);
        setToDoList(toDoList);
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (name) addTodoItem(name, new Date(date));

        setRefresh((curr) => !curr);
        setName("");
        setDate("");
        setShowForm(false);
        saveToLocalStorage();
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-background space-y-4 rounded p-4 py-8 fixed top-0 bottom-0 left-0 right-0 mx-auto my-auto max-w-md h-fit"
        >
            <p className="text-lg font-bold">Add an Todo</p>
            <div className="grid gap-2 text-start">
                <label htmlFor="">Name</label>
                <Input
                    type={"text"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="grid gap-2 text-start">
                <label htmlFor="">Date nad TIme</label>
                <Input
                    type={"datetime-local"}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <section className="flex justify-between">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                >
                    Close
                </Button>
                <Button>Add Item</Button>
            </section>
        </form>
    );
};

export default ToDoForm;

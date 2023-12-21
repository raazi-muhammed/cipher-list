import React, { useContext, useState } from "react";
import Input from "./ui/Input";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "../types/todo";

type ToDoFormType = {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const ToDoForm = ({ setShowForm, setRefresh }: ToDoFormType) => {
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<Date | null>(null);
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

        if (name) addTodoItem(name, date);

        setRefresh((curr) => !curr);
        setName("");
        setDate(null);
        setShowForm(false);
        saveToLocalStorage();
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-primary rounded p-4 fixed top-10 left-0 right-0 m-12 w-auto"
        >
            <div className="grid gap-2 text-start">
                <label htmlFor="">Name</label>
                <Input type={"text"} value={name} setValue={setName} />
            </div>
            <div className="grid gap-2 text-start">
                <label htmlFor="">Date nad TIme</label>
                <Input
                    type={"datetime-local"}
                    value={date}
                    setValue={setDate}
                />
            </div>
            <button>Submit</button>
        </form>
    );
};

export default ToDoForm;

import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "../types/todo";
import { Input, Button, ModalFooter } from "@nextui-org/react";
import toast from "react-hot-toast";

type ToDoFormType = {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
};
const ToDoForm = ({ setRefresh, onClose }: ToDoFormType) => {
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const { toDoList, setToDoList, saveToLocalStorage } =
        useContext(DataContext);

    if (!toDoList || !setToDoList || !saveToLocalStorage) return <p>Error</p>;

    const addTodoItem = (todoName: string, todoDate: string | null) => {
        const toDoToAdd: TodoItem = {
            id: uuidv4(),
            name: todoName,
            checked: false,
            doWhen: todoDate,
        };
        toDoList.push(toDoToAdd);
        setToDoList(toDoList);
        toast.success("added");
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (name) addTodoItem(name, date);
        else toast.error("cannot add");
        setRefresh((curr) => !curr);
        setName("");
        setDate("");

        saveToLocalStorage();
    };
    return (
        <>
            <form className="space-y-12" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    label="Todo"
                    placeholder="eg: Water"
                    labelPlacement="outside"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    type="datetime-local"
                    label="Date"
                    placeholder="eg: Water"
                    labelPlacement="outside"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </form>
            <ModalFooter className="p-0 py-4">
                <Button color="danger" variant="light" onPress={onClose}>
                    Close
                </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    onPress={onClose}
                >
                    Add
                </Button>
            </ModalFooter>
        </>
    );
};

export default ToDoForm;

import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import { TodoItem, PriorityTypes } from "../types/todo";
import { Input, Button, ModalFooter } from "@nextui-org/react";
import toast from "react-hot-toast";
import { Select, SelectItem } from "@nextui-org/react";

type ToDoFormType = {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
};
const AddToDoForm = ({ setRefresh, onClose }: ToDoFormType) => {
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [priority, setPriority] = useState<PriorityTypes>(PriorityTypes.NONE);
    const { toDoList, setToDoList, saveToLocalStorage } =
        useContext(DataContext);

    if (!toDoList || !setToDoList || !saveToLocalStorage) return <p>Error</p>;

    const addTodoItem = (
        todoName: string,
        todoDate: string | null,
        todoPriority: PriorityTypes
    ) => {
        const toDoToAdd: TodoItem = {
            id: uuidv4(),
            name: todoName,
            checked: false,
            doWhen: todoDate,
            priority: todoPriority,
            createdAt: new Date().toString(),
        };
        toDoList.push(toDoToAdd);
        setToDoList(toDoList);
        toast.success("added");
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (name) addTodoItem(name, date, priority);
        else toast.error("cannot add");
        setRefresh((curr) => !curr);
        setName("");
        setDate("");

        saveToLocalStorage();
    };
    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    label="Todo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    type="datetime-local"
                    label="Date"
                    placeholder="eg: date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <Select
                    value={priority}
                    defaultSelectedKeys={[priority.toString()]}
                    onChange={(e) => {
                        setPriority(
                            Number(e.target.value) as
                                | PriorityTypes
                                | PriorityTypes.NONE
                        );
                    }}
                    label="Priority"
                    className="dark text-foreground"
                >
                    <SelectItem
                        key={PriorityTypes.NONE}
                        value={PriorityTypes.NONE}
                    >
                        None
                    </SelectItem>
                    <SelectItem
                        key={PriorityTypes.LOW}
                        value={PriorityTypes.LOW}
                    >
                        Low
                    </SelectItem>
                    <SelectItem
                        key={PriorityTypes.MEDIUM}
                        value={PriorityTypes.MEDIUM}
                    >
                        Medium
                    </SelectItem>
                    <SelectItem
                        key={PriorityTypes.HIGH}
                        value={PriorityTypes.HIGH}
                    >
                        High
                    </SelectItem>
                </Select>
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

export default AddToDoForm;

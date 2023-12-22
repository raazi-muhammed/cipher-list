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
    todo: TodoItem;
};
const EditToDoForm = ({ setRefresh, onClose, todo }: ToDoFormType) => {
    const [name, setName] = useState<string>(todo.name);
    const [date, setDate] = useState<string>(todo.doWhen ? todo.doWhen : "");
    const [priority, setPriority] = useState<PriorityTypes>(
        todo.priority ? todo.priority : PriorityTypes.NONE
    );
    const { toDoList, setToDoList, saveToLocalStorage } =
        useContext(DataContext);

    if (!toDoList || !setToDoList || !saveToLocalStorage) return <p>Error</p>;

    const updatedToDo = (
        todoName: string,
        todoDate: string | null,
        todoPriority: PriorityTypes
    ) => {
        const updatedToDo: TodoItem = {
            id: uuidv4(),
            name: todoName,
            checked: false,
            doWhen: todoDate,
            priority: todoPriority,
            createdAt: todo.createdAt,
        };

        const updatedList = toDoList.map((_todo) => {
            if (_todo.id === todo.id) {
                _todo = updatedToDo;
            }
            return _todo;
        });

        setToDoList(updatedList);
        toast.success("edited");
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (name) updatedToDo(name, date, priority);
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
                    onChange={(e) => {
                        setPriority(
                            Number(e.target.value) as
                                | PriorityTypes
                                | PriorityTypes.NONE
                        );
                    }}
                    defaultSelectedKeys={[priority.toString()]}
                    label="Priority"
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

export default EditToDoForm;

import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import { TodoItem } from "../types/todo";
import ToDoForm from "./ToDoForm";
import { Input, Button, ButtonGroup } from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";

import toast from "react-hot-toast";

type AddToDoType = {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddToDo = ({ setRefresh }: AddToDoType) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                <div className="flex gap-4 justify-center p-8 align-center">
                    <Input
                        onChange={(e) => setTodoInput(e.target.value)}
                        value={todoInput}
                        type="text"
                        label="Todo"
                    />
                    <ButtonGroup color="primary" size="lg" className="my-auto">
                        <Button type="submit">Add</Button>
                        <Button onPress={onOpen}>Add modal</Button>
                    </ButtonGroup>
                </div>
            </form>

            <Modal
                className="dark text-foreground"
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="dark flex flex-col gap-1">
                                Add an Item
                            </ModalHeader>
                            <ModalBody>
                                <ToDoForm
                                    setRefresh={setRefresh}
                                    setShowForm={setShowForm}
                                    onClose={onClose}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddToDo;

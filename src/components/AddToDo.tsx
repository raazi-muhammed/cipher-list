import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { v4 as uuidv4 } from "uuid";
import { PriorityTypes, TodoItem } from "../types/todo";
import AddToDoForm from "./AddToDoForm";
import { Input, Button } from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from "@nextui-org/react";

import toast from "react-hot-toast";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/messages";

type AddToDoType = {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddToDo = ({ setRefresh }: AddToDoType) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [todoInput, setTodoInput] = useState<string>("");

    const { toDoList, setToDoList, saveToLocalStorage } =
        useContext(DataContext);
    if (!toDoList || !setToDoList || !saveToLocalStorage) return <p>Error</p>;

    const addTodoItem = (todoName: string) => {
        const toDoToAdd: TodoItem = {
            id: uuidv4(),
            name: todoName,
            priority: PriorityTypes.NONE,
            checked: false,
            doWhen: null,
            createdAt: new Date().toString(),
        };
        toDoList.push(toDoToAdd);
        setToDoList(toDoList);
        toast.success(SUCCESS_MESSAGES.TODO_ADDED);
    };

    const handleAddTodo = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!todoInput) {
            toast.error(ERROR_MESSAGES.TODO_INPUT_NO_VALUE);
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
                        label="Add Todo"
                    />
                    <Button
                        color="primary"
                        size="lg"
                        className="my-auto"
                        onPress={onOpen}
                    >
                        Add
                    </Button>
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
                                <AddToDoForm
                                    setRefresh={setRefresh}
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

import { TodoItem } from "../types/todo";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import moment from "moment";
//import Button from "./ui/button";
import toast from "react-hot-toast";
import { Checkbox } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";

type TodoListItemType = {
    todo: TodoItem;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const TodoListItem = ({ todo, setRefresh }: TodoListItemType): JSX.Element => {
    const { toDoList, setToDoList, saveToLocalStorage } =
        useContext(DataContext);

    if (!toDoList || !setToDoList || !saveToLocalStorage) return <p>Error</p>;

    const updateTodoList = (values: TodoItem[]) => {
        setToDoList(values);
        setRefresh((curr) => !curr);
        saveToLocalStorage();
    };
    const handleDelete = () => {
        const todoId = todo.id;
        let updatedTodo = toDoList.filter((todo) => {
            if (todo.id !== todoId) return todo;
        });

        updateTodoList(updatedTodo);
        toast.success("item removed");
    };

    const handleCheck = () => {
        const todoId = todo.id;
        toDoList.map((todo) => {
            if (todo.id === todoId) todo.checked = !todo.checked;
            return todo;
        });

        updateTodoList(toDoList);
    };

    return (
        <Card>
            <CardBody className="flex-row justify-between">
                <Checkbox onChange={handleCheck} defaultSelected={todo.checked}>
                    <p>{todo.name}</p>
                    {todo?.doWhen ? (
                        <p className="text-small opacity-60">
                            {moment(todo.doWhen).endOf("day").fromNow()}
                        </p>
                    ) : null}
                </Checkbox>

                <Dropdown className="dark text-foreground">
                    <DropdownTrigger>
                        <Button variant="flat">Options</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem onClick={handleCheck} key="mark-done">
                            Mark as done
                        </DropdownItem>
                        <DropdownItem
                            onClick={handleDelete}
                            key="delete"
                            className="text-danger"
                            color="danger"
                        >
                            Delete file
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </CardBody>
        </Card>
    );
};

export default TodoListItem;

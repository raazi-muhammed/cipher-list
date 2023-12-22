import { PriorityTypes, TodoItem } from "../types/todo";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { Checkbox } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import EditToDoForm from "./EditTodoForm";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from "@nextui-org/react";

type TodoListItemType = {
    todo: TodoItem;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const TodoListItem = ({ todo, setRefresh }: TodoListItemType): JSX.Element => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
        let updatedTodo = toDoList.filter((todo) => todo.id !== todoId);

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
                    <div className="flex text-small opacity-60 capitalize">
                        {todo?.doWhen ? (
                            <p>{moment(todo.doWhen).endOf("day").fromNow()}</p>
                        ) : null}
                        {todo?.doWhen && todo?.priority ? (
                            <p className="me-2">, </p>
                        ) : null}
                        {todo?.priority ? (
                            <p>
                                {`${PriorityTypes[
                                    todo.priority
                                ].toLowerCase()} priority`}
                            </p>
                        ) : null}
                    </div>
                </Checkbox>

                <Dropdown className="dark text-foreground">
                    <DropdownTrigger>
                        <Button
                            className="my-auto"
                            size="sm"
                            radius="full"
                            isIconOnly
                            variant="flat"
                        >
                            <img src="/icons/three-dot.svg" alt="" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Todo Options">
                        <DropdownItem onClick={handleCheck} key="mark-done">
                            Mark as done
                        </DropdownItem>
                        <DropdownItem key="edit" onPress={onOpen}>
                            Edit
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
                                <EditToDoForm
                                    todo={todo}
                                    setRefresh={setRefresh}
                                    onClose={onClose}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Card>
    );
};

export default TodoListItem;

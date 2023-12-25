import { TodoItem } from "../types/todo";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Checkbox } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import EditToDoForm from "./EditTodoForm";
import { BsThreeDots } from "react-icons/bs";
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
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/messages";
import PriorityChip from "./PriorityChip";
import DateChip from "./DateChip";
import ChipSeparator from "./ChipSeparator";

type TodoListItemType = {
    todo: TodoItem;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoListItem = ({ todo, setRefresh }: TodoListItemType): JSX.Element => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { toDoList, setToDoList, saveToLocalStorage } =
        useContext(DataContext);
    if (!toDoList || !setToDoList || !saveToLocalStorage)
        return <p>{ERROR_MESSAGES.DATA_CONTEXT_LOADING}</p>;

    const updateTodoList = (values: TodoItem[]) => {
        setToDoList(values);
        saveToLocalStorage();
        setRefresh((curr) => !curr);
    };

    const handleDelete = () => {
        const todoId = todo.id;
        let updatedTodo = toDoList.filter((todo) => todo.id !== todoId);

        updateTodoList(updatedTodo);
        toast.success(SUCCESS_MESSAGES.TODO_REMOVED);
    };

    const handleCheck = () => {
        const todoId = todo.id;

        const updatedToDoList = structuredClone(toDoList) as TodoItem[];
        updatedToDoList.map((todo) => {
            if (todo.id === todoId) todo.checked = !todo.checked;
            return todo;
        });

        updateTodoList(updatedToDoList);
    };

    return (
        <Card>
            <CardBody className="flex-row justify-between">
                <Checkbox onChange={handleCheck} defaultSelected={todo.checked}>
                    <p>{todo.name}</p>
                    <div className="flex text-small opacity-60 capitalize">
                        <DateChip doWhen={todo?.doWhen} />
                        <ChipSeparator
                            doWhen={todo?.doWhen}
                            priority={todo?.priority}
                        />
                        <PriorityChip priority={todo?.priority} />
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
                            <BsThreeDots size="1rem" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Todo Options">
                        <DropdownItem key="edit" onPress={onOpen}>
                            Edit
                        </DropdownItem>
                        <DropdownItem
                            onClick={handleDelete}
                            key="delete"
                            className="text-danger"
                            color="danger"
                        >
                            Delete todo
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
                                Edit Item
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

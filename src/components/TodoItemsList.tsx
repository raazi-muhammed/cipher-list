import React, { useContext } from "react";
import TodoListItem from "./TodoListItem";
import { DataContext } from "../context/DataContext";
import ERROR_MESSAGES from "../utils/errorMessages";

type TodoItemsListType = {
    showCompleted: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const TodoItemsList = ({ showCompleted, setRefresh }: TodoItemsListType) => {
    const { toDoList } = useContext(DataContext);
    if (!toDoList) return <p>{ERROR_MESSAGES.TODO_UNABLE_TO_FETCH}</p>;

    return (
        <section className="flex flex-col gap-4 mb-28">
            {toDoList?.length <= 0 ? (
                <p className="opacity-50 mt-10 mx-auto">
                    {ERROR_MESSAGES.TODO_NO_ITEMS}
                </p>
            ) : null}
            {toDoList.map((todo) => (
                <>
                    {showCompleted ? (
                        <TodoListItem
                            setRefresh={setRefresh}
                            key={todo.id}
                            todo={todo}
                        />
                    ) : (
                        <>
                            {!todo.checked ? (
                                <TodoListItem
                                    setRefresh={setRefresh}
                                    key={todo.id}
                                    todo={todo}
                                />
                            ) : null}
                        </>
                    )}
                </>
            ))}
        </section>
    );
};

export default TodoItemsList;

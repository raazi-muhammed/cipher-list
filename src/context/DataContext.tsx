import { createContext, useState } from "react";
import { TodoItem } from "../types/todo";

type DataContextType = {
    toDoList?: TodoItem[];
    setToDoList?: React.Dispatch<React.SetStateAction<TodoItem[]>>;
    handleCheck?: (todoId: string) => void;
};
export const DataContext = createContext<DataContextType>({});

export const DataProvider = ({ children }: any) => {
    const [toDoList, setToDoList] = useState<TodoItem[]>([]);
    const [refresh, setRefresh] = useState(true);

    const handleCheck = (todoId: string) => {
        toDoList.map((todo) => {
            if (todo.id === todoId) todo.checked = !todo.checked;
            return todo;
        });
        setToDoList(toDoList);
        setRefresh(!refresh);
    };

    return (
        <DataContext.Provider value={{ toDoList, handleCheck, setToDoList }}>
            {children}
        </DataContext.Provider>
    );
};

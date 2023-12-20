import { createContext, useState } from "react";
import { TodoItem } from "../types/todo";
import useLocalStorage from "../hooks/useLocalStorage";

type DataContextType = {
    toDoList?: TodoItem[];
    setToDoList?: React.Dispatch<React.SetStateAction<TodoItem[]>>;
    handleCheck?: (todoId: string) => void;
    saveToLocalStorage?: () => void;
};
export const DataContext = createContext<DataContextType>({});

export const DataProvider = ({ children }: any) => {
    const [toDoList, setToDoList, saveToLocalStorage] = useLocalStorage<
        TodoItem[]
    >("__cipher-list-data", []);
    const [refresh, setRefresh] = useState(true);

    const handleCheck = (todoId: string) => {
        toDoList.map((todo) => {
            if (todo.id === todoId) todo.checked = !todo.checked;
            return todo;
        });
        setToDoList(toDoList);
        setRefresh(!refresh);
        saveToLocalStorage();
    };

    return (
        <DataContext.Provider
            value={{ toDoList, handleCheck, saveToLocalStorage, setToDoList }}
        >
            {children}
        </DataContext.Provider>
    );
};

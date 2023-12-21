import { createContext } from "react";
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

    return (
        <DataContext.Provider
            value={{ toDoList, saveToLocalStorage, setToDoList }}
        >
            {children}
        </DataContext.Provider>
    );
};

import { useEffect, useState } from "react";

function getSavedValues(key: string, initialData: any) {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : initialData;
}

export default function useLocalStorage<T>(
    key: string,
    initialData: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
    const [data, setData] = useState(() => getSavedValues(key, initialData));

    const saveToLocalStorage = () => {
        window.localStorage.setItem(key, JSON.stringify(data));
    };

    return [data, setData, saveToLocalStorage];
}

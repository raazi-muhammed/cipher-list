import { useState } from "react";
import CryptoJS from "crypto-js";

function getSavedValues(key: string, initialData: any) {
    const encryptedData = window.localStorage.getItem(key);
    if (!encryptedData) return initialData;

    const bytes = CryptoJS.AES.decrypt(encryptedData, "secret key 123");
    const data = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(data);
}

export default function useLocalStorage<T>(
    key: string,
    initialData: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void, () => void] {
    const [data, setData] = useState(() => getSavedValues(key, initialData));

    const clearLocalStorage = () => {
        window.localStorage.removeItem(key);
    };

    const saveToLocalStorage = () => {
        const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            "secret key 123"
        ).toString();

        window.localStorage.setItem(key, encryptedData);
    };

    return [data, setData, saveToLocalStorage, clearLocalStorage];
}

import { useState } from "react";
import CryptoJS from "crypto-js";

function getSavedValues(key: string, initialData: any, password: string) {
    try {
        const encryptedData = window.localStorage.getItem(key);
        if (!encryptedData) return initialData;

        const bytes = CryptoJS.AES.decrypt(encryptedData, password);
        const data = bytes.toString(CryptoJS.enc.Utf8);

        return JSON.parse(data);
    } catch (error) {
        window.localStorage.removeItem(key);
        return null;
    }
}

export default function useLocalStorage<T>(
    key: string,
    initialData: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void, () => void] {
    let secretKey = process.env.REACT_APP_SECRET_KEY || "XYR7xCIOfjD607gXWQjC";

    const [data, setData] = useState(() =>
        getSavedValues(key, initialData, secretKey)
    );

    const clearLocalStorage = () => {
        window.localStorage.removeItem(key);
    };

    const saveToLocalStorage = () => {
        const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            secretKey
        ).toString();

        window.localStorage.setItem(key, encryptedData);
    };

    return [data, setData, saveToLocalStorage, clearLocalStorage];
}

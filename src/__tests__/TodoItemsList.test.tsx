import { useState } from "react";
import { render, renderHook, screen } from "@testing-library/react";
import TodoItemsList from "../components/TodoItemsList";
import { DataProvider } from "../context/DataContext";
import { ERROR_MESSAGES } from "../utils/messages";

describe("Single Todo Card", () => {
    const [refresh, setRefresh] = renderHook(() => useState<boolean>(false))
        .result.current;
    test(`should show ${ERROR_MESSAGES.TODO_UNABLE_TO_FETCH} -> without data context`, () => {
        render(<TodoItemsList showCompleted={false} setRefresh={setRefresh} />);
        const ele = screen.getByText(ERROR_MESSAGES.TODO_UNABLE_TO_FETCH);
        expect(ele).toBeInTheDocument();
    });

    test(`should show ${ERROR_MESSAGES.TODO_NO_ITEMS} -> with data context, without todo`, () => {
        render(
            <DataProvider>
                <TodoItemsList showCompleted={false} setRefresh={setRefresh} />
            </DataProvider>
        );
        const ele = screen.getByText(ERROR_MESSAGES.TODO_NO_ITEMS);
        expect(ele).toBeInTheDocument();
    });
});

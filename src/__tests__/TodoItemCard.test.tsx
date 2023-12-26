import { useState } from "react";
import { render, renderHook, screen } from "@testing-library/react";
import { DataProvider } from "../context/DataContext";
import { ERROR_MESSAGES } from "../utils/messages";
import TodoItemCard from "../components/TodoItemCard";
import { TodoItem } from "../types/todo";

describe("Single Todo Card", () => {
    const [refresh, setRefresh] = renderHook(() => useState<boolean>(false))
        .result.current;
    test(`should show ${ERROR_MESSAGES.DATA_CONTEXT_LOADING} -> without data context`, () => {
        render(
            <TodoItemCard
                todo={
                    {
                        id: "1",
                        name: "2000-10-31",
                        doWhen: new Date().toString(),
                        checked: false,
                        priority: 1,
                    } as TodoItem
                }
                setRefresh={setRefresh}
            />
        );
        const ele = screen.getByText(ERROR_MESSAGES.DATA_CONTEXT_LOADING);
        expect(ele).toBeInTheDocument();
    });

    test(`should show the todo card -> with data context, proper data`, () => {
        render(
            <DataProvider>
                <TodoItemCard
                    todo={
                        {
                            id: "1",
                            name: "todo",
                            doWhen: "2000-10-31",
                            checked: false,
                            priority: 1,
                        } as TodoItem
                    }
                    setRefresh={setRefresh}
                />
            </DataProvider>
        );
        const name = screen.getByText("todo");
        const checkbox = screen.getByRole("checkbox", { checked: false });
        const priority = screen.getByText(/priority/);

        expect(name).toBeInTheDocument();
        expect(checkbox).toBeInTheDocument();
        expect(priority).toBeInTheDocument();
    });
    test(`should show the todo card -> with data context, even without doWhen and priority`, () => {
        render(
            <DataProvider>
                <TodoItemCard
                    todo={
                        {
                            id: "1",
                            name: "todo",
                            checked: false,
                        } as TodoItem
                    }
                    setRefresh={setRefresh}
                />
            </DataProvider>
        );
        const name = screen.getByText("todo");
        const checkbox = screen.getByRole("checkbox", { checked: false });
        const priority = screen.queryByText(/priority/);

        expect(name).toBeInTheDocument();
        expect(checkbox).toBeInTheDocument();
        expect(priority).not.toBeInTheDocument();
    });
    test(`should check the input box -> if checked is true`, () => {
        render(
            <DataProvider>
                <TodoItemCard
                    todo={
                        {
                            id: "1",
                            name: "todo",
                            checked: true,
                        } as TodoItem
                    }
                    setRefresh={setRefresh}
                />
            </DataProvider>
        );
        const ele = screen.getByRole("checkbox", { checked: true });
        expect(ele).toBeInTheDocument();
    });
    test(`should un check the input box -> if checked is false`, () => {
        render(
            <DataProvider>
                <TodoItemCard
                    todo={
                        {
                            id: "1",
                            name: "todo",
                            checked: false,
                        } as TodoItem
                    }
                    setRefresh={setRefresh}
                />
            </DataProvider>
        );
        const ele = screen.getByRole("checkbox", { checked: false });
        expect(ele).toBeInTheDocument();
    });
});

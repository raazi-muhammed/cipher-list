import { render, screen, renderHook } from "@testing-library/react";
import user from "@testing-library/user-event";
import AddToDo from "../components/AddToDo";
import { DataProvider } from "../context/DataContext";
import { useState } from "react";
import TodoItemsList from "../components/TodoItemsList";

describe("Adding Todo", () => {
    const [refresh, setRefresh] = renderHook(() => useState<boolean>(false))
        .result.current;

    test("Add todo", async () => {
        render(
            <DataProvider>
                <AddToDo setRefresh={setRefresh} />
                <TodoItemsList showCompleted={false} setRefresh={setRefresh} />
            </DataProvider>
        );

        const inputBox = screen.getByRole("textbox", {
            name: /add todo add todo/i,
        });

        await user.type(inputBox, "Drink Water{enter}");
        expect(inputBox).toHaveValue("");

        const todoItem = screen.getByText("Drink Water");
        expect(todoItem).toBeInTheDocument();
    });
});

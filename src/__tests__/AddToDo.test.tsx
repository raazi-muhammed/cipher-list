import { render, screen, renderHook } from "@testing-library/react";
import user from "@testing-library/user-event";
import AddToDo from "../components/AddToDo";
import { DataProvider } from "../context/DataContext";
import { useState } from "react";

describe("Adding Todo", () => {
    const [refresh, setRefresh] = renderHook(() => useState<boolean>(false))
        .result.current;

    test("Should show a toaster", async () => {
        render(
            <DataProvider>
                <AddToDo setRefresh={setRefresh} />
            </DataProvider>
        );

        const inputBox = screen.getByRole("textbox", {
            name: /add todo add todo/i,
        });

        await user.type(inputBox, "Drink Water{enter}");
        expect(inputBox).toHaveValue("");

        //const addButton = screen.getByRole("button", { name: "Add" });
        //await user.click(addButton);
    });
});

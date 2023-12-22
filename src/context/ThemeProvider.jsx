// used js file because there is no type declarations files for next-theme and it was throwing an error

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function NextThemeProvider({ children }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    );
}

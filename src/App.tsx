import HomePage from "./pages/HomePage";
import { DataProvider } from "./context/DataContext";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <DataProvider>
                <HomePage />
            </DataProvider>
            <Toaster
                position="top-center"
                toastOptions={{
                    success: {
                        style: {
                            borderRadius: "1rem",
                            backgroundColor: "hsl(var(--nextui-content1))",
                            color: "hsl(var(--nextui-foreground))",
                        },
                    },
                    error: {
                        style: {
                            borderRadius: "1rem",
                            backgroundColor: "hsl(var(--nextui-content1))",
                            color: "hsl(var(--nextui-foreground))",
                        },
                    },
                }}
            />
        </>
    );
}

export default App;

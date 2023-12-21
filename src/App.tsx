import "./App.css";
import HomePage from "./pages/HomePage";
import { DataProvider } from "./context/DataContext";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div className="App bg-background text-foreground min-h-screen">
            <DataProvider>
                <HomePage />
            </DataProvider>
            <Toaster
                position="top-center"
                toastOptions={{
                    success: {
                        style: {
                            borderRadius: "var(--radius)",
                            backgroundColor: "hsl(var(--card))",
                            color: "hsl(var(--card-foreground))",
                        },
                    },
                    error: {
                        style: {
                            borderRadius: "var(--radius)",
                            backgroundColor: "hsl(var(--card))",
                            color: "hsl(var(--card-foreground))",
                        },
                    },
                }}
            />
        </div>
    );
}

export default App;

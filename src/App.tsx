import "./App.css";
import HomePage from "./pages/HomePage";
import { DataProvider } from "./context/DataContext";

function App() {
    return (
        <div className="App bg-background text-foreground min-h-screen">
            <DataProvider>
                <HomePage />
            </DataProvider>
        </div>
    );
}

export default App;

import "./App.css";
import AuthContextProvider from "./context/AuthContext";
import CardContextProvider from "./context/CardContext";
import AppRouter from "./router/Router";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <CardContextProvider>
          <AppRouter />
        </CardContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;

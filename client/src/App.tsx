import LoginForm from "./components/LoginForm/LoginForm";
import MainLayout from "./components/MainLayout/MainLayout";

function App() {
    return (
      <div className="app-wrapper">
        <LoginForm />
        <MainLayout /> 
      </div>
    );
  }

  export default App;
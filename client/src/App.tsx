import LoginForm from "./components/LoginForm/LoginForm";
import MainLayout from "./components/AppMain/AppMain";

function App() {
    return (
      <div className="app-wrapper">
        <LoginForm />
        <MainLayout /> 
      </div>
    );
  }

  export default App;
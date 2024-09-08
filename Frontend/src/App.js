import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage}/>
    </Routes>
  );
}
export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Employees from "./features/employees/Employees.jsx";
import Main from "./features/main/Main";
import FormRegister from "./features/formRegister/FormRegister";

function App() {
  return (
    <div>
      <Main />
      <Routes>
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </div>
  );
}

export default App;

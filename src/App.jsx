import { Route, Routes } from "react-router-dom";
import "./App.css";
import Employees from "./features/employees/Employees.jsx";
import Main from "./features/main/Main";
import Person from "./features/person/Person";

function App() {
  return (
    <div>
      <Main />
      <Routes>
        <Route path="/employees" element={<Employees />} />
        <Route path="change/:id" element={<Person />} />
      </Routes>
    </div>
  );
}

export default App;

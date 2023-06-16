import { Route, Routes } from "react-router-dom";
import "./App.css";
import Employees from "./features/employees/Employees.jsx";
import Main from "./features/main/Main";
import Person from "./features/person/Person";
import Task from "./pages/tasks/Task";
import ChangeUser from "./features/changeusers/ChangeUser";





function App() {
  return (
    <div>
      <Main />
      <Routes>
        <Route path="/employees" element={<Employees />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/change/:id" element={<Person />} />
        <Route path="/person/:id"  element={<ChangeUser />} />
      </Routes>
     
    
    </div>
  );
}

export default App;

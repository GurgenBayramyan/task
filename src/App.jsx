import { Route, Routes } from "react-router-dom";
import "./App.css";
import Employees from "./features/employees/Employees.jsx";
import Main from "./features/main/Main";
import Person from "./features/person/Person";
import TaskForm from "./features/taskForm/TaskForm.jsx";
import CreateTask from "./features/taskForm/TaskPage";

function App() {
  return (
    <div>
      <Main />
      <Routes>
        <Route path="/employees" element={<Employees />} />
        <Route path="change/:id" element={<Person />} />
      </Routes>
      <CreateTask />
    </div>
  );
}

export default App;

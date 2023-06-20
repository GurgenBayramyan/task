import {Route, Routes} from "react-router-dom";
import Employees from "./features/employees/Employees.jsx";
import Main from "./features/main/Main";
import Task from "./pages/tasks/Task";
import ChangeUser from "./features/changeusers/ChangeUser";

const App = () => (
    <div>
        <Main/>
        <Routes>
            <Route path="/employees" element={<Employees/>}/>
            <Route path="/tasks" element={<Task/>}/>
            <Route path="/person/:id" element={<ChangeUser/>}/>
        </Routes>
    </div>
);

export default App;

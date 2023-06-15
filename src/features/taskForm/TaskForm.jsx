import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, fetchEmployees } from "./taskFormSlice";
import './TaskForm.scss'
export default function TaskForm() {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector(state => state.tasks);
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    employeeId: ""
  });

  useEffect(
    () => {
      dispatch(fetchEmployees());
    },
    [dispatch]
  );
  const handleInputChange = event => {
    const { name, value } = event.target;
    setTaskData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(createTask(taskData));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={taskData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={taskData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={taskData.startDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={taskData.endDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="employeeId">Employee</label>
        <select
          id="employeeId"
          name="employeeId"
          value={taskData.employeeId}
          onChange={handleInputChange}
          required
        >
          <option value="">Select an employee</option>
          {employees.map(employee =>
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          )}
        </select>
      </div>
      <button type="submit" disabled={loading}>
        Create Task
      </button>
    </form>
  );
}

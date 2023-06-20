import React, { useEffect } from 'react'
import {  Field, Form, Formik, } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { initialTask} from '../../helpers/formData'
import {addTask} from '../taskList/taskSlice'
import { fetchEmployess } from '../employees/employeesSlice'
import './TaskForm.scss'

export default function FormRegister({ onSubmit: handleUpdateData }) {
  const dispatch = useDispatch();
  const {users} = useSelector(state=>state);
  useEffect(()=>{
    dispatch(fetchEmployess(users.url))
  },[])
  const onSubmit = (values, { resetForm }) => {
    console.log(values)
    dispatch(addTask({ ...values }))
    resetForm();
  }

  return (
    <Formik
      initialValues={initialTask}
      onSubmit={onSubmit}
    >
      {() => {
        return (
            <Form className='form_for_task'>
              <div>
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                 
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <Field as="textarea" id="description" name="description" />
              </div>
              <div>
                <label htmlFor="startDate">Start Date</label>
                <Field
                  type="date"
                  id="startDate"
                  name="startDate"
                 
                />
              </div>
              <div>
                <label htmlFor="endDate">End Date</label>
                <Field
                  type="date"
                  id="endDate"
                  name="endDate"
             
                />
              </div>
              <div>
                <label htmlFor="employeeId">Employee</label>
              <Field as="select" id="employeeId" name="employeeId">
                <option value="">Select an employee</option>
                {users.employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </Field>
              </div>
              <button type="submit" >
                Create Task
              </button>
            </Form>
        )
      }}
    </Formik>
  )
}


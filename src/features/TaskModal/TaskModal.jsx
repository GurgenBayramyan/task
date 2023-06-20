import React, { useEffect, useState } from 'react'
import { Field, Form, Formik,} from 'formik'
import './TaskModal.scss'
import { fetchEmployess } from '../employees/employeesSlice'
import { useSelector } from 'react-redux'
export default function TaskModal({isActive,setActive,onUpdate,taskObj}) {
    const[task,setTask] = useState(taskObj);
    // console.log(task)
  
    const {users} = useSelector(state=>state);
    useEffect(()=>{
        setTask(taskObj);
        fetchEmployess(users.url)
    },[])
  return (
    <div className={isActive ? "modal isActive" : "modal"} onClick={()=> setActive(!isActive)}> 
        <div className="modal_contnent" onClick={(e)=>e.stopPropagation()}>
        <Formik
            initialValues={task}
            enableReinitialize={true}
            onSubmit={onUpdate}
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
                      Change Task
                    </button>
                  </Form>
                )
            }}
        </Formik>
        
        </div>  
    </div>
  )
}

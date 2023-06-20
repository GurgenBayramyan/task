import React, { useEffect, useState } from 'react'
import {ErrorMessage, Field, Form, Formik,} from 'formik'
import {validationSchema} from '../../helpers/formData'
import './Modal.scss'
export default function Modal({isActive,setActive,onUpdate,employee}) {
    const[user,setUser] = useState()
    useEffect(()=>{
        setUser(employee)
    })
   
  
  return (
    <div className={isActive ? "modal isActive" : "modal"} onClick={()=> setActive(!isActive)}> 
        <div className="modal_contnent" onClick={(e)=>e.stopPropagation()}>
        <Formik
            initialValues={user}
            enableReinitialize={true}
            onSubmit={onUpdate}
            validateOnBlur={true}
            validateOnChange={true}
            validationSchema={validationSchema}
        >
            {() => {
                return (
                        <Form >
                            <h1>Change  Employees</h1>
                            <div >
                                <p>name</p>
                                <Field type="text" id='name' name='name'/>
                                <ErrorMessage name='name' component="p"/>
                            </div>
                            <div >
                                 <p>surname</p>
                                <Field type="surname" id='surname' name='surname'/>
                                <ErrorMessage name='surname' component='p'/>
                            </div>
                            <div >
                                <p>email</p>
                                <Field type="email" id='email' name='email'/>
                                <ErrorMessage name='email' component="p"/>
                            </div>
                            
                               <div>
                                <p>position</p>
                                <Field type="position" id='position' name='position'/>
                                <ErrorMessage name='email' component="p"/>
                               </div>

                            <input className='change' type="submit" value="change"/>
                        </Form>
                )
            }}
        </Formik>
        
        </div>  
    </div>
  )
}

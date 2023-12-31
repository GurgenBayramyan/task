import React from 'react'
import {ErrorMessage, Field, Form, Formik,} from 'formik'
import {useDispatch} from 'react-redux'
import {initial, validationSchema} from '../../helpers/formData'
import './FormRegister.scss'
import {addEmployee} from "../employees/employeesSlice";

export default function FormRegister({onSubmit: handleUpdateData}) {
    const dispatch = useDispatch();

    const onSubmit = (values, {resetForm}) => {
        dispatch(addEmployee({...values}))
        resetForm();
    }

    return (
        <Formik
            initialValues={initial}
            onSubmit={onSubmit}
            validateOnBlur={true}
            validateOnChange={true}
            validationSchema={validationSchema}
        >
            {() => {
                return (
                    <div className='form'>
                        <Form className='form_main'>
                            <h1>add new Employees</h1>
                            <div className='form_block'>
                                <label htmlFor='username'>name</label>
                                <Field type="text" id='name' name='name'/>
                                <ErrorMessage name='name' component="p"/>
                            </div>
                            <div className='form_block'>
                                <label htmlFor='surname'>surname</label>
                                <Field type="surname" id='surname' name='surname'/>
                                <ErrorMessage name='surname' component='p'/>
                            </div>
                            <div className='form_block'>
                                <label htmlFor='email'>email</label>
                                <Field type="email" id='email' name='email'/>
                                <ErrorMessage name='email' component="p"/>
                            </div>
                            <div className='form_block'>
                                <label htmlFor='position'>position</label>
                                <Field type="position" id='position' name='position'/>
                                <ErrorMessage name='email' component="p"/>
                            </div>
                            <input type="submit" value="Register"/>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}

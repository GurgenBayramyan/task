import React, {useEffect, useState} from 'react'
import {ErrorMessage, Field, Form, Formik,} from 'formik'
import {validationSchema} from '../../helpers/formData'
import './FormUpdate.scss'

export default function FormUpdate({employee, onUpdate}) {
    const [user, setUser] = useState(employee)

    useEffect(() => {
        setUser(employee)
    }, [employee])

    return (
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
                            <input className='change' type="submit" value="change"/>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}

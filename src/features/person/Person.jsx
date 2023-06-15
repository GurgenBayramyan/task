import React, { useEffect } from 'react'
import './Person.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { changeData, getData } from './personSlice';
export default function Person() {
  const { person } = useSelector(state => state)
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData(id))
  }, [])
  const handleSubmit = (event) => {
    event.preventDefault();
    const{name,email,surname,position} = event.target;
    const body = {
      name:name.value,
      email:email.value,
      surname:surname.value,
      position:position.value
    }
    dispatch(changeData(id,body))
    
  }
  return (
    <form  onSubmit={handleSubmit} className='person'>
      <div className='form_block'>

        <label htmlFor='username'>name</label>
        <input type="text" id='name' name='name' />


      </div>
      <div className='form_block'>
        <label htmlFor='surname'>surname</label>
        <input type="surname" id='surname' name='surname' />

      </div>
      <div className='form_block'>
        <label htmlFor='email'>email</label>
        <input type="email" id='email' name='email' />

      </div>
      <div className='form_block'>
        <label htmlFor='position'>position</label>
        <input type="position" id='position' name='position' />

      </div>

      <input className='change' type="submit" value="change" />

    </form>
  )
}

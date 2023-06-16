import React, { useEffect } from 'react'
import './Person.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { changeData, getData, pushBody } from './personSlice';
export default function Person() {
  const { loading,error} = useSelector(state => state)
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData(id))
  }, [dispatch, id])
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const{name,email,surname,position} = event.target;
    const change = {
      name:name.value,
      email:email.value,
      surname:surname.value,
      position:position.value
    }
    
    dispatch(pushBody(change));

    dispatch(changeData({ id, body: change }));
    navigate("/")
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
      {loading ? 'Updating...' : null}
      <input className='change' type="submit" value="change" />
      {error && <p>{error}</p>}
    </form>
  )
}

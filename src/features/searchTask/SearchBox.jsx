import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchTask } from './searchSlice';
import './Search.scss'
export default function SearchBox() {

  const dispatch = useDispatch();




  const handleSubmit = (e) => {
    e.preventDefault();
    let name = e.target[0].value
    dispatch(searchTask(name))
  }

  return (
    <>
      <form  className="search_box" onSubmit={(e) => handleSubmit(e)}>
        <input className='search_box_input' type="search" placeholder='search by name' />
        <input className='search_box_submit' type="submit" value="search" />
      </form>
    </>
  )
}

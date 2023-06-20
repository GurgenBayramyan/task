import React from 'react'
import './Main.scss'
import { NavLink } from 'react-router-dom'
export default function Main() {
  return (
    <header className='main'>
        <h2 className='main_title'><NavLink to='./'>Logo</NavLink></h2>
        <div className='main_nav'>
            <NavLink to="/employees">Employees</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
        </div>
    </header>
  )
}

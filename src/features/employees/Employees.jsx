import React,{useEffect} from 'react'   
import { useDispatch,useSelector } from 'react-redux'
import { fetchEmployess } from './employeesSlice';
import './Employees.scss'

export default function Employees() {
    const{users} = useSelector(state=>state)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchEmployess("https://rocky-temple-83495.herokuapp.com/employees"))
    },[])
  return (
    <div>
       {users.loading && <p>Loading...</p>}
       {!users.loading && users.eror? <p>eror {users.eror}</p>:null}
       {!users.loading && users.employees.length ?(
            <div className='user'>
               {users.employees.map(user=>{
                    return(
                           <div key={user.id} className='user_block'>
                                <b>{user.name}</b>
                                <b>{user.surname}</b>
                                <span>{user.email}</span>
                                <p>{user.position}</p>
                           </div>
                    )
               })} 
            </div>
       ):null}
    </div>
  )
}

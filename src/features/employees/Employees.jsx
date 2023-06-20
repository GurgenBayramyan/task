import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { dataCount, deletePerson, fetchEmployess, getEmployTask, setCurrentPage, updateEmployee, } from './employeesSlice';
import pagination from '../../helpers/pagination';
import './Employees.scss'
import FormRegister from '../formRegister/FormRegister'
import Modal from '../modal/Modal';


export default function Employees() {
    const[isActive,setActive] = useState(false)
    const [id, setId] = useState(null);

    const { users } = useSelector(state => state)
    const { currentPage, perPage, totalPage, url, loading, employees, isUpdating,modal } = users;
    let pagesCount = Math.ceil(totalPage / perPage);

    const navigate = useNavigate();
    const pages = [];
    const dispatch = useDispatch();
    const [user, setUser] = useState({})
    useEffect(() => {
        dispatch(dataCount(url));
        
    }, [])
    useEffect(()=>{
        dispatch(getEmployTask(id))
    },[id])

    

    const getEmployees = () => {
        dispatch(fetchEmployess(`${url}?_page=${currentPage}&_limit=${perPage}`))
    }

    useEffect(() => {
        isUpdating && getEmployees()
        dispatch(dataCount(url));
        
        
    }, [isUpdating])
    
    const onSubmit = () => getEmployees()

    pagination(pages, pagesCount, currentPage)
    const handleDelete = (id) => {
        dispatch(deletePerson(id))
    }

    const handleClick = (id) => {
        navigate(`/person/${id}`)
    }

    const handleUpdate = (user) => {
        setActive(!isActive)
        setUser(user)
    }
    

    const onUpdate = (values) => {
        dispatch(updateEmployee({ id: user.id, body: { ...values, id: undefined } }));
        setUser({})
        setActive(false)
    }
    const handleTask = (id) =>{
       
    }
    return (
        <div>
            
            {loading && <h1 className='loader'>loading...</h1>}

            {!loading && users.eror ? <p>error {users.eror}</p> : null}

            {!loading && employees.length ? (
                <div className='user'>
                    {employees.map(user => (
                        <div  key={user.id} className='user_block'>
                            <h3 onClick={() => handleClick(user.id)}
                                className='user_block_name'>name {user.name}</h3>
                            <hr />
                            <h3 onClick={() => handleClick(user.id)}
                                className='user_block_surname'>surname {user.surname}</h3>
                            <hr />
                            
                            <p onClick={() => handleClick(user.id)}
                                className='user_block_email'>email {user.email}</p>
                            <hr />
                            <p className='user_block_position'>position {user.position}</p>
                            <button onClick={() => handleDelete(user.id)} className='user_block_btn'>Delete</button>
                            <button className='user_block_change' onClick={() => handleUpdate(user)}>Change</button>
                            <button  onClick={()=>{ 
                                setId(user.id)}} className='user_block_set' >tasks</button>
                           {user.id===id && modal.length && <pre>{JSON.stringify(modal,undefined,6)}</pre>}
                        </div>
                    ))}
                </div>
            ) : null}

            <div className='pages'>
                {pages.map((el, index) => (
                    <span onClick={() => dispatch(setCurrentPage(el))} key={crypto.randomUUID().slice(15)}
                        className={currentPage === el ? "current-page" : "page"}>{el}</span>
                ))}
            </div>
            
            <FormRegister onSubmit={onSubmit} />
            <Modal onUpdate={onUpdate}  employee={user} isActive={isActive} setActive={setActive} />
        </div>
    )
}

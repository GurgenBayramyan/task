import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataCount, fetchEmployess, fetchTotal, setCurrentPage, setTotalPage } from './employeesSlice';
import pagination from '../../helpers/pagination';
import './Employees.scss'
import FormRegister from '../formRegister/FormRegister';


export default function Employees() {
     const { users } = useSelector(state => state)
     const { currentPage, perPage, totalPage, url, test } = users;
     const pagesCount = Math.ceil(totalPage / perPage);

     const pages = [];

     const dispatch = useDispatch();
     useEffect(() => {
          dispatch(dataCount(url));

     }, [])
     useEffect(() => {
          dispatch(fetchEmployess(`${url}?_page=${currentPage}&_limit=${perPage}`))
          
     }, [currentPage])
     pagination(pages, pagesCount, currentPage)
     const handleDelete = () => [
          
     ]
     return (
          <div>
               {users.loading && <h1 className='loader'>loading...</h1>}
               {!users.loading && users.eror ? <p>eror {users.eror}</p> : null}
               {!users.loading && users.employees.length ? (
                    <div className='user'>
                         {users.employees.map(user => {
                              return (
                                   <div key={user.id} className='user_block'>
                                        <h3 className='user_block_name'>name {user.name}</h3>
                                        <hr />
                                        <h3 className='user_block_surname'>surname {user.surname}</h3>
                                        <hr />
                                        <p className='user_block_email'>email {user.email}</p>
                                        <hr />
                                        <p className='user_block_position'>position {user.position}</p>
                                        <button onClick={handleDelete} className='user_block_btn'>Delete</button>
                                   </div>
                              )
                         })}
                    </div>
               ) : null}
               <div className='pages'>
                    {pages.map((el, index) => {
                         return (
                              <span onClick={() => dispatch(setCurrentPage(el))} key={crypto.randomUUID().slice(15)} className={currentPage == el ? "current-page" : "page"}>{el}</span>
                         )
                    })}
               </div>
              <FormRegister />
          </div>
     )
}

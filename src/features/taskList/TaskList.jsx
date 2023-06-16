import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, deleteTaskData, fetchTasks, setCurrentPage, taskCount } from './taskSlice';
import pagination from '../../helpers/pagination';
import './TaskList.scss'
export default function TaskList() {
  const { myTasks } = useSelector(state => state)
  const { currentPage, perPage, totalPage, url } = myTasks;
  const pagesCount = Math.ceil(totalPage / perPage);
  const pages = [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskCount(url))
  }, [])

  useEffect(() => {
    dispatch(fetchTasks(`${url}?_page=${currentPage}&_limit=${perPage}`))

  }, [currentPage])
  pagination(pages, pagesCount, currentPage)
  const handleClik = (id) => {
    dispatch(deleteTask(`${id}`))
    dispatch(deleteTaskData(id))
  }
  
  return (
    <div>
      {myTasks.loading && <h1 className='loader'>loading...</h1>}
      {!myTasks.loading && myTasks.eror ? <p>eror {myTasks.eror}</p> : null}
      {!myTasks.loading && myTasks.tasks.length ? (
        <div className='block'>
          {myTasks.tasks.map(tasks => {
            return (
              <div className='task' key={tasks.id}>
                <h3  className='task_name'> {tasks.name}</h3>

                <p className='task_desc'> {tasks.description}</p>
                <span className='task_date'>{tasks.startDate} - {tasks.endDate}</span>

                <p className='task_id' >user Id {tasks.employeeId}</p>
                <button onClick={()=>handleClik(tasks.id)}>delete</button>
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
    </div>
  )
}

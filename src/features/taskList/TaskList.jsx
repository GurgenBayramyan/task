import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask,  fetchTasks, setCurrentPage, taskCount, updateTasks } from './taskSlice';
import pagination from '../../helpers/pagination';
import TaskForm from '../taskForm/TaskForm'
import './TaskList.scss'

export default function TaskList() {
  const { myTasks } = useSelector(state => state)
  const { currentPage, perPage, totalPage, url, loading, tasks, isUpdating, eror } = myTasks;
  const pagesCount = Math.ceil(totalPage / perPage);
  const pages = [];
  const dispatch = useDispatch();
  const [userTask, setUserTask] = useState({})

  useEffect(() => {
    dispatch(taskCount(url))
  }, [])

  const getUserTasks = () => {
    dispatch(fetchTasks(`${url}?_page=${currentPage}&_limit=${perPage}`))
  }

  useEffect(() => {
    isUpdating && getUserTasks()
  }, [isUpdating])


  const onSubmit = () => getUserTasks()

  pagination(pages, pagesCount, currentPage)

  const handleDelete = (id) => {
    dispatch(deleteTask(id))
}
const handleUpdate = (task) => {
  setUserTask(task)
}
const onUpdate = (values) => {
  dispatch(updateTasks({id: userTask.id, body: {...values, id: undefined}}));
  setUserTask({})
}
  

  

  return (
    <div>
      {loading && <h1 className='loader'>loading...</h1>}
      {!loading && eror ? <p>eror {eror}</p> : null}
      {!loading && tasks.length ? (
        <div className='block'>
          {tasks.map(tasks => {
            return (
              <div className='task' key={tasks.id}>
                <h3 className='task_name'> {tasks.name}</h3>

                <p className='task_desc'> {tasks.description}</p>
                <span className='task_date'>{tasks.startDate} - {tasks.endDate}</span>

                <p className='task_id' >user Id {tasks.employeeId}</p>
                <button onClick={() => handleDelete(tasks.id)}>delete</button>
              </div>
            )
          })}
        </div>
      ) : null}
      <div className='pages'>
                {pages.map((el, index) => (
                    <span onClick={() => dispatch(setCurrentPage(el))} key={crypto.randomUUID().slice(15)}
                        className={currentPage === el ? "current-page" : "page"}>{el}</span>
                ))}
            </div>
                  
      <TaskForm  onSubmit={onSubmit}/>
        
    </div>
  )
}

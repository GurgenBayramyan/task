import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTasks, setCurrentPage, taskCount, updateTasks } from './taskSlice';
import pagination from '../../helpers/pagination';
import TaskForm from '../taskForm/TaskForm'
import './TaskList.scss'
import Modal from '../modal/Modal';
import TaskModal from '../TaskModal/TaskModal';

export default function TaskList() {
  const { myTasks } = useSelector(state => state)
  const [isActive, setActive] = useState(false)
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
    dispatch(taskCount(url))
  }, [isUpdating])


  const onSubmit = () => getUserTasks()

  pagination(pages, pagesCount, currentPage)
  
  const handleDelete = (id) => {
    dispatch(deleteTask(id))
  }
  const handleUpdate = (task) => {
    setActive(!isActive)
    setUserTask(task)
  }
  const onUpdate = (values) => {
    dispatch(updateTasks({ id: userTask.id, body: { ...values, id: undefined } }));
    setUserTask({})
    setActive(false)
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
                <button  onClick={() => handleUpdate(tasks)}>Change</button>
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

      <TaskForm onSubmit={onSubmit} />
      <TaskModal onUpdate={onUpdate} taskObj={userTask} isActive={isActive} setActive={setActive} />
    </div>
  )
}

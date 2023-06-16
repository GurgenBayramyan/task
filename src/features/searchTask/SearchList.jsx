import React from 'react'
import { useSelector } from 'react-redux'

export default function SearchList() {
    const {search} = useSelector(state=>state);
    const{error,searchData,loading} = search;
    
  return (
    <div>
      {loading && <h1 className='loader'>loading...</h1>}
      {!loading && error? <p>error {error}</p> : null}
      {!loading && searchData.length ? (
        <div className='block'>
          {searchData.map(tasks => {
            return (
              <div className='task' key={tasks.id}>
                <h3  className='task_name'> {tasks.name}</h3>

                <p className='task_desc'> {tasks.description}</p>
                <span className='task_date'>{tasks.startDate} - {tasks.endDate}</span>

                <p className='task_id' >user Id {tasks.employeeId}</p>

              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

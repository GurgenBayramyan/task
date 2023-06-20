import React from 'react'
import TaskList from '../../features/taskList/TaskList'
import SearchList from '../../features/searchTask/SearchList'
import SearchBox from '../../features/searchTask/SearchBox';
export default function Task() {
  return (
    <>
      
      <TaskList />
      <SearchBox />
      <SearchList />
    </>
  )
}

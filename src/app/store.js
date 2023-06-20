import {configureStore} from '@reduxjs/toolkit'
import employeesSlice from '../features/employees/employeesSlice'
import taskFormSlice from '../features/taskForm/taskFormSlice'
import taskSlice from '../features/taskList/taskSlice'
import searchSlice from '../features/searchTask/searchSlice'

export default configureStore({
    reducer: {
        users: employeesSlice,
        tasks: taskFormSlice,
        myTasks: taskSlice,
        search: searchSlice
    }
})

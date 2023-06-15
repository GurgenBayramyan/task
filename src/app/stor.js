import { configureStore } from '@reduxjs/toolkit'
import employeesSlice from '../features/employees/employeesSlice'
import formRegisterSlice from '../features/formRegister/formRegisterSlice'
import personSlice from '../features/person/personSlice'
import taskFormSlice from '../features/taskForm/taskFormSlice'



export default configureStore({
  reducer: {
    users:employeesSlice,
    form:formRegisterSlice,
    person:personSlice,
    tasks:taskFormSlice
  }
})
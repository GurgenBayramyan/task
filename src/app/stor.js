import { configureStore } from '@reduxjs/toolkit'
import employeesSlice from '../features/employees/employeesSlice'
import formRegisterSlice from '../features/formRegister/formRegisterSlice'



export default configureStore({
  reducer: {
    users:employeesSlice,
    form:formRegisterSlice
  }
})
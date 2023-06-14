import { configureStore } from '@reduxjs/toolkit'
import mainSlice from '../features/main/mainSlice'


export default configureStore({
  reducer: {
    main:mainSlice
  }
})
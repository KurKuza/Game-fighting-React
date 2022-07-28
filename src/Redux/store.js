import { configureStore } from '@reduxjs/toolkit'
import characteristicsSlice  from './slices/characteristicsSlice';

export const store = configureStore({
	reducer: {
    characteristics: characteristicsSlice,
  },
})
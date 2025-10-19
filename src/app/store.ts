import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../entities/slices/todosSlice';
import uiReducer from '../entities/slices/uiSlice';

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    selected: boolean;
}

interface TodosState {
    list: Todo[];
    loading: boolean;
    error: string | null;
}

const API_URL = 'http://localhost:3001/todos';

const initialState: TodosState = {
    list: [],
    loading: false,
    error: null,
};

// Async Thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get<Todo[]>(API_URL);
        return res.data;
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});

export const addTodo = createAsyncThunk('todos/addTodo', async (text: string, { rejectWithValue }) => {
    if (!text.trim()) return rejectWithValue('Todo text cannot be empty');
    try {
        const res = await axios.post<Todo>(API_URL, { text, completed: false, selected: false });
        return res.data;
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async ({ id, text }: { id: number; text: string }, { rejectWithValue }) => {
        if (!text.trim()) return rejectWithValue('Todo text cannot be empty');
        try {
            const res = await axios.put<Todo>(`${API_URL}/${id}`, { text });
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        toggleSelect: (state, action: PayloadAction<number>) => {
            state.list = state.list.map(todo =>
                todo.id === action.payload ? { ...todo, selected: !todo.selected } : todo
            );
        },
        clearError: state => {
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.list = state.list.filter(todo => todo.id !== action.payload);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.list = state.list.map(todo => (todo.id === action.payload.id ? action.payload : todo));
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { toggleSelect, clearError } = todosSlice.actions;
export default todosSlice.reducer;

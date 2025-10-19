import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    showModal: boolean;
    editingId: number | null;
    editingText: string;
    filterText: string;
}

const initialState: UIState = {
    showModal: false,
    editingId: null,
    editingText: '',
    filterText: '',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ id: number; text: string }>) => {
            state.showModal = true;
            state.editingId = action.payload.id;
            state.editingText = action.payload.text;
        },
        closeModal: state => {
            state.showModal = false;
            state.editingId = null;
            state.editingText = '';
        },
        setEditingText: (state, action: PayloadAction<string>) => {
            state.editingText = action.payload;
        },
        setFilterText: (state, action: PayloadAction<string>) => {
            state.filterText = action.payload;
        },
    },
});

export const { openModal, closeModal, setEditingText, setFilterText } = uiSlice.actions;
export default uiSlice.reducer;

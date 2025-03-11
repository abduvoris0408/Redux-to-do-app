import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    filters: { status: "all", search: "" },
  },
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    updateBook: (state, action) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) state.books[index] = action.payload;
    },
    toggleStatus: (state, action) => {
      const book = state.books.find(book => book.id === action.payload);
      if (book) book.completed = !book.completed;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { addBook, deleteBook, updateBook, toggleStatus, setFilters } = bookSlice.actions;
export default bookSlice.reducer;

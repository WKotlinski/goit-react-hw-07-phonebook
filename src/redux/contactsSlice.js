import { createSlice } from "@reduxjs/toolkit";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    filter: "",
  },
  reducers: {},
});
export const { addContacts, deleteContacts } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getContacts, addContacts, deleteContacts } from "./operaction";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    isLoading: false,
    error: null,
    contacts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    const pending = (state, action) => {
      state.isLoading = true;
    };
    const rejected = (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    };
    builder
      .addCase(getContacts.pending, pending)
      .addCase(getContacts.rejected, rejected)
      .addCase(getContacts.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.contacts = actions.payload.map((con) => ({
          name: con.name,
          number: con.phone,
        }));
      })
      .addCase(addContacts.pending, pending)
      .addCase(addContacts.rejected, rejected)
      .addCase(addContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
      })
      .addCase(deleteContacts.pending, pending)
      .addCase(deleteContacts.rejected, rejected)
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          (con) => con.id !== action.payload
        );
      });
  },
});

export const contactsReducer = contactsSlice.reducer;

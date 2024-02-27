import { createSlice } from "@reduxjs/toolkit";
import { getContacts, addContacts, deleteContacts } from "./operaction";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    isLoading: false,
    error: null,
    contacts: [],
    filter: "",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
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
          id: con.id,
          name: con.name,
          phone: con.phone,
        }));
      })
      .addCase(addContacts.pending, pending)
      .addCase(addContacts.rejected, rejected)
      .addCase(addContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        const { name, phone } = action.payload;
        state.contacts = [...state.contacts, { name, phone }];
      })
      .addCase(deleteContacts.pending, pending)
      .addCase(deleteContacts.rejected, rejected)
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          (con) => con.id !== action.payload.id
        );
      });
  },
});
export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

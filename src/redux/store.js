import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer, contactsSlice } from "./contactsSlice";

const store = configureStore({
  reducer: { contacts: contactsReducer },
});
export default store;

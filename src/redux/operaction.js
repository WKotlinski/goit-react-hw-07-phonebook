import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://65db35013ea883a152915209.mockapi.io";

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("contacts/contacts");
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContacts = createAsyncThunk(
  "contacts/addContacts",
  async ({ name, phone }, thunkAPI) => {
    try {
      const res = await axios.post("contacts/contacts", {
        name,
        phone,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  "contacts/deteteContact",
  async (contactId, thunkAPI) => {
    try {
      console.log(contactId);
      const res = await axios.delete(`contacts/contacts/${contactId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

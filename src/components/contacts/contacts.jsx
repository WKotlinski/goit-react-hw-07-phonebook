import { useEffect } from "react";
import { nanoid } from "nanoid";
import Filter from "../filter/filter";
import ContactForm from "../form/form";
import ContactList from "../list/list";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts, selectFilter } from "../../redux/selectors";
import { setFilter } from "../../redux/filterSlice";
import {
  addContacts,
  deleteContacts,
  getContacts,
} from "../../redux/operaction";

const ContactsApp = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isContactExist = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExist) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContacts(newContact));
    }
  };

  const deleteContact = (contactId) => {
    dispatch(deleteContacts(contactId));
  };

  const handleChangeFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter ? filter.toLowerCase() : "";

    return contacts.filter((contact) =>
      contact.name
        ? contact.name.toLowerCase().includes(normalizedFilter)
        : false
    );
  };
  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default ContactsApp;

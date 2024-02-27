import { useEffect } from "react";

import Filter from "../filter/filter";
import ContactForm from "../form/form";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts, selectFilter } from "../../redux/selectors";
import { setFilter } from "../../redux/contactsSlice";
import {
  addContacts,
  deleteContacts,
  getContacts,
} from "../../redux/operaction";
import Contact from "../list/list";

const ContactsApp = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const addContact = ({ name, phone }) => {
    const newContact = {
      name,
      phone,
    };

    const isContactExist = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExist) {
      alert(`${name} is already in contacts.`);
    } else {
      console.log(newContact);
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
      {filteredContacts.map((con) => (
        <Contact key={con.id} contact={con} handleClick={deleteContact} />
      ))}
    </div>
  );
};

export default ContactsApp;

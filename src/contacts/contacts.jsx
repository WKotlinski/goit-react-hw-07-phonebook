import { useEffect } from "react";
import { nanoid } from "nanoid";
import Filter from "../filter/filter";
import ContactForm from "../form/form";
import ContactList from "../list/list";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/reducers";

const ContactsApp = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => {
    state.contact.contacts;
  });
  const filter = useSelector((state) => {
    state.contact.filter;
  });

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      dispatch(addContact(JSON.parse(storedContacts)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

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
      dispatch(addContact(newContact));
    }
  };

  const deleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleChangeFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
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

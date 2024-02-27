const Contact = ({ contact, handleClick }) => {
  return (
    <li key={contact.id}>
      ID: {contact.id} <br />
      Name:{contact.name} <br />
      Phone: {contact.phone} <br />
      <button onClick={() => handleClick(contact.id)}>Delete</button>
    </li>
  );
};

export default Contact;

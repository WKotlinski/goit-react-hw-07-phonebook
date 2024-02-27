const Contact = ({ contact, handleClick }) => {
  return (
    <li key={contact.id}>
      ID: {contact.id} <br />
      Name:{contact.name} <br />
      Phone: {contact.number} <br />
      Dodatkowo: {contact.createdAt} <br />
      <button onClick={() => handleClick(contact.id)}>Delete</button>
    </li>
  );
};

export default Contact;

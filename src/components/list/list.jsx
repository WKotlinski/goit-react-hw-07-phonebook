const Contact = ({ contact, handleClick }) => {
  return (
    <li>
      ID: {contact.id} <br />
      Name:{contact.name} <br />
      Number: {contact.number}
      <button onClick={() => handleClick(contact.id)}>Delete</button>
    </li>
  );
};

export default Contact;

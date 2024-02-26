import PropTypes from "prop-types";

const Contact = ({ contact, handleClick }) => {
  return (
    <li>
      Name:{contact.name} <br />
      Number: {contact.number}
      <button onClick={() => handleClick(contact.id)}>Delete</button>
    </li>
  );
};

export default Contact;

import PropTypes from 'prop-types';
import s from './ContactList.module.css';

export default function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.contactList}>
      {contacts.map(({ name, number, id }) => (
        <li className={s.name} key={id}>
          {name}: <span className={s.number}>{number}</span>
          <button
            type="button"
            className={s.button}
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,      
    }),
  )
};

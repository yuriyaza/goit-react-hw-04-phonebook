import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';

import { getRandomColor } from 'js/getRandomColor';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <li className={css.contactCard} key={contact.id}>

            <div className={css.userIcon} style={{ color: getRandomColor() }}>
              <FaUserCircle />
            </div>

            <div className={css.userInfo}>
              <div className={css.userName}>{contact.name}</div>
              <div>{contact.number}</div>
            </div>

            <button
              className={css.deleteButton}
              type="button"
              onClick={()=>onDeleteContact(contact.id)}>
              <span className={css.deleteIcon}><BsTrash /></span>
            </button>

          </li>
        );
      })}
    </ul>
  );
};

ContactList.types = {
  contacts: PropTypes.object.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

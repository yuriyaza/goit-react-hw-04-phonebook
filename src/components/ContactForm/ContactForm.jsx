import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import css from './ContactForm.module.css';

export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    const newContact = {
      id: uuid(),
      name: this.state.name,
      number: this.state.number,
    };

    this.props.onAddContact(newContact);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.onFormSubmit}>
        
        <div className={css.inputWrapper}>
          <label>
            <span className={css.label}>Name</span>
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={this.state.name}
              onChange={this.onInputChange}
            />
          </label>

          <label>
            <span className={css.label}>Number</span>
            <input
              className={css.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={this.state.number}
              onChange={this.onInputChange}
            />
          </label>
        </div>

        <button className={css.button} type="submit">
          Add contact
        </button>

      </form>
    );
  }
}

ContactForm.types = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

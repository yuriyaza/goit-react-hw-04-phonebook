import React from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import css from './App.module.css';

import { Notify } from 'notiflix';
Notify.init({ showOnlyTheLastOne: true, clickToClose: true });

export class App extends React.Component {
  state = {
    contacts: [
      // Дані для демонстрації роботи
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = newContact => {
    const namesList = this.state.contacts.map(item => item.name.toLowerCase());

    if (namesList.includes(newContact.name.toLowerCase())) {
      Notify.failure(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState({ contacts: [...this.state.contacts, newContact] });
  };

  onDeleteContact = deletedContactId => {
    const newList = this.state.contacts.filter(
      item => item.id !== deletedContactId
    );
    this.setState({ contacts: newList });
  };

  onFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  filterContacts = () => {
    return this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    const visibleContacts = this.filterContacts();
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact} />

        <h2 className={css.subtitle}>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onFilterChange={this.onFilterChange}
        />

        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

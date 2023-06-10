import React, { useEffect, useMemo } from 'react';
import { Notify } from 'notiflix';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import css from './App.module.css';
import { useState } from 'react';

Notify.init({ showOnlyTheLastOne: true, clickToClose: true });

export class oldApp extends React.Component {
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
    const newList = this.state.contacts.filter(item => item.id !== deletedContactId);
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
        <Filter filter={this.state.filter} onFilterChange={this.onFilterChange} />

        <ContactList contacts={visibleContacts} onDeleteContact={this.onDeleteContact} />
      </div>
    );
  }
}

// =================================================
const STORAGE = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem(STORAGE)) ?? [
        // Початкові дані для демонстрації роботи
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = newContact => {
    const nameList = contacts.map(contact => contact.name.toLowerCase());

    if (nameList.includes(newContact.name.toLowerCase())) {
      Notify.failure(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts(contacts => [...contacts, newContact]);
  };

  const onDeleteContact = id => {
    const contactListWithoutDeleted = contacts.filter(contact => contact.id !== id);
    setContacts(contactListWithoutDeleted);
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
  }, [contacts, filter]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />

      <h2 className={css.subtitle}>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter} />

      <ContactList contacts={filteredContacts} onDeleteContact={onDeleteContact} />
    </div>
  );
};

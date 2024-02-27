import css from './App.module.css';

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import AddContactForm from './AddContactForm/AddContactForm';
import Phonebook from './Phonebook/Phonebook';
import ContactFilter from './ContactFilter/ContactFilter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('saved-contacts'));
    return data || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('saved-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const dublicateName = ({ name }) => {
    const normalizeName = name.toLowerCase().replaceAll(' ', '');

    const dublicate = contacts.find(item => {
      const normalizeCurrentName = item.name.toLowerCase().replaceAll(' ', '');
      return normalizeCurrentName === normalizeName;
    });

    return Boolean(dublicate);
  };
  const addContact = info => {
    const { name } = info;

    if (dublicateName(info)) {
      return alert(`${name} is already in contacts.`);
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...info,
      };
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const inputFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase().replaceAll(' ', '');

    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase().replaceAll(' ', '');

      return normalizedName.includes(normalizedFilter);
    });

    return filteredContacts;
  };

  const items = getFilteredContacts();

  return (
    <div className={css.box}>
      <h1>Phonebook</h1>
      <AddContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <div className={css.contacts_box}>
        <ContactFilter inputFilter={inputFilter} />
        <Phonebook items={items} deleteContact={deleteContact} />
      </div>
    </div>
  );
};

export default App;

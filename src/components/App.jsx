import css from './App.module.css';

import { Component } from 'react';
import { nanoid } from 'nanoid';

import AddContactForm from './AddContactForm/AddContactForm';
import Phonebook from './Phonebook/Phonebook';
import ContactFilter from './ContactFilter/ContactFilter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('saved-contacts'));
    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(
        'saved-contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  dublicateName({ name }) {
    const normalizeName = name.toLowerCase().replaceAll(' ', '');
    const { contacts } = this.state;

    const dublicate = contacts.find(item => {
      const normalizeCurrentName = item.name.toLowerCase().replaceAll(' ', '');
      return normalizeCurrentName === normalizeName;
    });

    return Boolean(dublicate);
  }

  addContact = info => {
    const { name } = info;

    if (this.dublicateName(info)) {
      return alert(`${name} is already in contacts.`);
    }

    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(),
        ...info,
      };

      return {
        contacts: [...contacts, newContact],
      };
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const updatedContacts = contacts.filter(item => item.id !== id);

      return {
        contacts: updatedContacts,
      };
    });
  };

  inputFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase().replaceAll(' ', '');

    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase().replaceAll(' ', '');

      return normalizedName.includes(normalizedFilter);
    });

    return filteredContacts;
  }

  render() {
    const { addContact, deleteContact, inputFilter } = this;
    const contacts = this.getFilteredContacts();

    return (
      <div className={css.box}>
        <h1>Phonebook</h1>
        <AddContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <div className={css.contacts_box}>
          <ContactFilter inputFilter={inputFilter} />
          <Phonebook items={contacts} deleteContact={deleteContact} />
        </div>
      </div>
    );
  }
}

export default App;

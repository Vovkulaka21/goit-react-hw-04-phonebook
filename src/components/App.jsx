import css from './App.module.css';

import { useState } from 'react';
import { nanoid } from 'nanoid';

import AddContactForm from './AddContactForm/AddContactForm';
import Phonebook from './Phonebook/Phonebook';
import ContactFilter from './ContactFilter/ContactFilter';

const App = () => {
  const [contacts, setContacts] = useState([{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}]);
  const [filter, setFilter] = useState('');

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
        <Phonebook
          items={items}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  );
};

/* class App extends Component {
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
} */

export default App;

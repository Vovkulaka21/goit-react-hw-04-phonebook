import { useState } from 'react';

import { nanoid } from 'nanoid';

import css from './AddContactForm.module.css';

const AddContactForm = ({ onSubmit }) => {
  const idName = nanoid();
  const idNumber = nanoid();

  const [state, setState] = useState({ name: '', number: '' });

  const inputChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const hndSubmit = s => {
    s.preventDefault();

    onSubmit({ ...state });
    reset();
  };

  const reset = () => {
    setState({ ...state });
  };

  return (
    <form onSubmit={hndSubmit} className={css.form}>
      <label htmlFor={idName}>Name</label>
      <input
        onChange={inputChange}
        id={idName}
        value={state.name}
        placeholder="Name"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor={idNumber}>Number</label>
      <input
        onChange={inputChange}
        id={idNumber}
        value={state.number}
        placeholder="Number"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
};

export default AddContactForm;

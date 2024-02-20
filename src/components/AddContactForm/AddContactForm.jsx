import { Component } from 'react';

import { nanoid } from 'nanoid';

import css from './AddContactForm.module.css'

class AddContactForm extends Component {
    
    idName = nanoid();
    idNumber = nanoid();

    state = {
        name: '',
        number: '',
      };

    inputChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
          [name]: value,
        });
      };
    
      hndSubmit = s => {
        s.preventDefault();

        this.props.onSubmit({...this.state});

        this.setState({
          name: '',
          number: '',
        });
      };
      render() {
        const { idName, idNumber, hndSubmit, inputChange } = this;
        return (<form onSubmit={hndSubmit} className={css.form}>
            <label htmlFor={idName}>Name</label>
            <input
              onChange={inputChange}
              id={idName}
              value={this.state.name}
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
              value={this.state.number}
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
          </form>)
      }
}

export default AddContactForm
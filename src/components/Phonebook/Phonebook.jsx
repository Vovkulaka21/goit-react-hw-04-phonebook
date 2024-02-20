import css from './Phonebook.module.css';

const Phonebook = ({ items, deleteContact }) => {
  const elements = items.map(({ id, name, number }) => (
    <li key={id}>
      {name}: {number}{' '}
      <button
        onClick={() => deleteContact(id)}
        className={css.btn_delete}
        type="button"
      >
        Delete
      </button>
    </li>
  ));

  return <ol className={css.list}>{elements}</ol>;
};

export default Phonebook;

const ContactFilter = ({inputFilter}) => {
  return (
    <>
      {' '}
      <label>Find contacts by name</label>
      <input onChange={inputFilter} placeholder="Filter" />
    </>
  );
};

export default ContactFilter;

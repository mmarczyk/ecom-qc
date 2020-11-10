const Checkbox = props => {
  const { name, action, checked } = props;

  return (
    <div className="Checkbox">
      <input type="checkbox" name={name} onClick={action} checked={checked}/>
      <i className="icofont-tick-boxed" />
      <i className="empty" />
    </div>
  );
};
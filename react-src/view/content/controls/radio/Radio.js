const Radio = props => {
  const { name, action, checked } = props;

  return (
    <div className="Radio">
      <input type="radio" name={name} onClick={action} checked={checked}/>
      <i className="icofont-tick-boxed" />
      <i className="empty" />
    </div>
  );
};
const Checkbox = props => {
  const { name } = props;

  return (
    <div className="Checkbox">
      <input type="checkbox" name={name} />
      <i className="icofont-tick-boxed" />
      <i className="empty" />
    </div>
  );
};
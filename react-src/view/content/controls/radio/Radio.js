const Radio = props => {
  const { name } = props;

  return (
    <div className="Radio">
      <input type="radio" name={name} />
      <i className="icofont-tick-boxed" />
      <i className="empty" />
    </div>
  );
};
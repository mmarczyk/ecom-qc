const Shipping = props => {
  let css = "Shipping ";
  if (props.type) css += props.type + " ";
  if (props.editable) css += "editable";
  return (
    <div className={css}>
      <h1>Dostawa</h1>
      <ul>
        <li>
          {props.editable && <Radio name="carrier" />}
          <span>Kurier: 10zł</span>
        </li>
        <li>
          {props.editable && <Radio name="carrier" />}
          <span>Kurier za pobraniem: 15zł</span>
        </li>
        <li>
          {props.editable && <Radio name="carrier" />}
          <span>Paczkomaty: 9zł</span>
        </li>
      </ul>
    </div>
  );
};
const Shipping = props => {
  let css = "Shipping ";
  return (
    <div className={css}>
      <h1>Dostawa</h1>
      <ul>
        <li>
          <span>Kurier: 10zł</span>
        </li>
        <li>
          <span>Kurier za pobraniem: 15zł</span>
        </li>
        <li>
          <span>Paczkomaty: 9zł</span>
        </li>
      </ul>
    </div>
  );
};
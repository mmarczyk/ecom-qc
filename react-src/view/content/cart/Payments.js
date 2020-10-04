const Payments = () => {
  return (
    <div className="Payments">
      <h1>Płatność</h1>
      <ul>
        <li>
          <Radio name="payment" />
          <span>Płatność przy odbiorze</span>
        </li>
        <li>
          <Radio name="payment" />
          <span>PayU</span>
        </li>
        <li>
          <Radio name="payment" />
          <span>Przelew tradycyjny</span>
        </li>
      </ul>
    </div>
  );
};
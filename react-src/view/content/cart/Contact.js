const Contact = () => {
  return (
      <div className="Contact">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Imię i nazwisko / Nazwa"
            onChange={event => handleInputChange(event, formatName)}
          />
          <input
            type="text"
            name="street"
            placeholder="Ulica i nr domu"
            onChange={event => handleInputChange(event, formatStreet)}
          />
          <input
            type="text"
            name="zip"
            placeholder="__-___"
            onChange={event => handleInputChange(event, formatZipCode)}
          />
          <input
            type="text"
            name="city"
            placeholder="Miejscowość"
            onChange={event => handleInputChange(event, formatCity)}
          />
        </div>
        <div>
          <textarea
            rows="5"
            placeholder="Wpisz tutaj dodatkowe informacje"
            name="info"
          />
        </div>
        <div>
          <div>
            <label for="rules">
              <Checkbox name="rules" />
              Akceptuję regulamin sklepu dostępny tutaj.
            </label>
          </div>
          <div>
            <label for="gdpr">
              <Checkbox name="gdpr" />
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
              realizacji zamówienia.
            </label>
          </div>
        </div>
      </div>
    );
};
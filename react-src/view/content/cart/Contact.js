const Contact = () => {
    return (
        <div className="Contact">
            <div>
                <Textinput
                    name="name"
                    placeholder="Imię i nazwisko / Nazwa"
                    formatter={formatName}
                    bind={setOrderName}
                    value={oPageData.aCart.oOrder.name}
                />
                <Textinput
                    name="street"
                    placeholder="Ulica i nr domu"
                    formatter={formatStreet}
                    bind={setStreet}
                    value={oPageData.aCart.oOrder.street}
                />
                <Textinput
                    name="zip"
                    placeholder="__-___"
                    formatter={formatZipCode}
                    bind={setZip}
                    value={oPageData.aCart.oOrder.zip}
                />
                <Textinput
                    name="city"
                    placeholder="Miejscowość"
                    formatter={formatCity}
                    bind={setCity}
                    value={oPageData.aCart.oOrder.city}
                />
            </div>
            <div>
                <Textinput
                    rows="5"
                    placeholder="Wpisz tutaj dodatkowe informacje"
                    name="info"
                />
            </div>
            <div>
                <div>
                    <label for="rules">
                        <Checkbox
                            name="rules"
                            action={() => setAcceptRules()}
                            checked={oPageData.aCart.bAcceptRules}/>
                        Akceptuję regulamin sklepu dostępny tutaj.
                    </label>
                </div>
                <div>
                    <label for="gdpr">
                        <Checkbox
                            name="gdpr"
                            action={() => setAcceptGdpr()}
                            checked={oPageData.aCart.bAcceptGdpr}/>
                        Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
                        realizacji zamówienia.
                    </label>
                </div>
            </div>
        </div>
    );
};
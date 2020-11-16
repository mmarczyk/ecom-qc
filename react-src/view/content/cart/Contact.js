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
                    name="email"
                    placeholder="Adres email"
                    formatter={formatEmail}
                    bind={setEmail}
                    value={oPageData.aCart.oOrder.email}
                />
                <Textinput
                    name="tel"
                    placeholder="Nr telefonu"
                    formatter={formatPhone}
                    bind={setPhone}
                    value={oPageData.aCart.oOrder.phone}
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
                    rows="7"
                    placeholder="Wpisz tutaj dodatkowe informacje"
                    name="info"
                    bind={setOrderComment}
                    value={oPageData.aCart.oOrder.comment}
                />
            </div>
            <div>
                <div>
                    <label>
                        <Checkbox
                            name="rules"
                            action={() => setAcceptRules()}
                            checked={oPageData.aCart.bAcceptRules}/>
                        Akceptuję regulamin sklepu dostępny tutaj.
                    </label>
                </div>
                <div>
                    <label>
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
const Review = () => {
    return (
        <div className="Review">
            <h1>{oPageData.sName}</h1>
            <div>
                <Textinput
                    name="author"
                    placeholder="Twoje imię / pseudonim"
                />
                <Textinput
                    name="title"
                    placeholder="Tytuł"
                />
                <Rating
                    name="rating"
                />
                <Textinput
                    name="description"
                    placeholder="Opis"
                    rows="5"
                />
                <Submit>Wyślij</Submit>
            </div>
        </div>
    );
}
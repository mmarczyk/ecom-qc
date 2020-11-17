const Search = () => {
  return (
    <div className="Search">
        <div className="wrapper">
            <Textinput
                name="sPhrase"
                bind={text => fetchProducts(text, sSearchPage)}
                value={oPageData.sPhrase}
            />
        </div>
    </div>
  );
};
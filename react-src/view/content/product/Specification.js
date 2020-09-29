const Specification = () => {
  return (
    <div className="Specification">
      <ul>
        <li>
          <h1>Materiał</h1>
          <span>sznurek szary, ...</span>
        </li>
        <li>
          <h1>Wymiary</h1>
          <span>Wysokość: 20cm</span>
        </li>
      </ul>
      <div className="desc">
        <h1>Opis</h1>
        <span>{oPageData.sDescriptionFull}</span>
      </div>
    </div>
  );
};
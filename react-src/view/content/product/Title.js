const Title = () => {
  return (
    <div className="Title">
        <h1>{oPageData.sName}</h1>
        <span>{oPageData.mPrice} PLN</span>
        <Submit href={sCartPage} action={addToCart}>Dodaj do koszyka</Submit>
    </div>
  );
};
const ProductItem = () => {
  return (
    <div className="ProductItem">
      <div>
        <Link href="/product/10">
          <img src="/gfx/product.jpg" alt="product" />
        </Link>
      </div>
      <div>
        <div>
          <span>Babuszka duża</span>
        </div>
        <div>
          <span>220 zł </span>
          <Amount />
          <span>440 zł</span>
        </div>
      </div>
    </div>
  );
};
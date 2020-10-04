const App = () => {
    const dialog = showDialog ? showDialog : null;
    return (
        <div className="App">
            <Header/>
            <Content/>
            <Footer/>
            {dialog}
        </div>
    );
};
const addToCart = (target, productId) => {
    event.preventDefault();
    
    genericFetch(
        target,
        (data, href) => {
            history.pushState({href: href}, '', href);
            oPageData = data;
            Animation.start();
            renderApp();
        },
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'iProductAdd='+productId+'&iQuantity=1'
        }
    );
    
    return false;
};
const navigateTo = (event) => {
    event.preventDefault();

    genericFetch(
        event.currentTarget,
        (data, href) => {
            history.pushState({href: href}, '', href);
            oPageData = data;
            Animation.start();
            renderApp();
        }
    );

    return false;
}
const genericFetch = (target, callback, options) => {
    const json = target.search === '' ? '?json' :'&json';
    const [orgHref, href] = [
        target.href,
        target.href + json
    ];
    
    fetch(href, options)
        .then(response => response.json())
        .then((data) => callback(data, orgHref));
};
const Animation = {
    init: () => {
        rootElement.classList.add("visible"), 100;
    },
    start: () => {
        rootElement.classList.remove("visible");
        setTimeout(() => rootElement.classList.add("visible"), 100);
    }
};

const Link = ({href, children}) => {
    return (
        <a href={href} onClick={navigateTo}>{children}</a>
    );
}
const Submit = ({href, action, children}) => {
    return (
        <a href={href} onClick={action}>{children}</a>
    );
}
const Content = () => {
    let content = <Homepage />;
    if (window.location.search !== '') {
        content = null;
        if (window.location.search.match(/^\?\d+,.*$/)) {
            content = <Product />;
        } else if (oPageData.iProducts) {
            content = <Category />;
        } else if (oPageData.aCart) {
            content = <Cart />;
        } else {
            content = <CmsPage />;
        }
    }

    return (
        <div className="Content container">
            {content}
        </div>
    );
};
const Cart = () => {
    return (
        <div className="Cart">
            <List />
            <div>
                <Shipping editable />
                <Payments />
            </div>
            <Contact />
            <Summary />
        </div>
    );
};
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
const Summary = () => {
    return (
        <div className="Summary">
            <h1>Podsumowanie</h1>
            <div>
                <div>
                    <span>Koszt zakupów</span>
                    <span>1000 zł</span>
                </div>
                <div>
                    <span>Koszt dostawy</span>
                    <span>10 zł</span>
                </div>
                <div>
                    <span>Do zapłaty</span>
                    <span>1000 zł</span>
                </div>
                <div>
                    <a>Zapłać</a>
                </div>
            </div>
        </div>
    );
};
const Amount = () => {
  return (
    <div className="Amount">
      <button>
        <i className="icofont-rounded-down" />
      </button>
      <span>2</span>
      <button>
        <i className="icofont-rounded-up" />
      </button>
    </div>
  );
};
const List = () => {
  return (
    <div className="List">
      <div>
        <ul>
          <li>
            <ProductItem />
          </li>
          <li>
            <ProductItem />
          </li>
          <li>
            <ProductItem />
          </li>
        </ul>
      </div>
    </div>
  );
};
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
const Category = () => {
    return (
        <div className="Category">
            <Description/>
            <Subcategories/>
            <ProductList/>
        </div>
    );
};
const Description = () => {
    return (
        <div className="Description">
            <h1>{oPageData.sName}</h1>
            <div dangerouslySetInnerHTML={{ __html: oPageData.sDescriptionShort }} />
        </div>
    );
};
const Subcategories = () => {
    if ('aPages' in oPageData) {
        const subcategories = oPageData.aPages.map(element => {
            const img = element.sImage ? <img src={element.sImage.sFileName}/> : null;
            return (
                <li>
                    <Link href={element.sLinkName}>
                        <h1>{element.sName}</h1>
                        {img}
                        <div dangerouslySetInnerHTML={{ __html: element.sDescriptionShort }} />
                    </Link>
                </li>
            )
        });
        return (
            <div className="Subcategories">
                <ul>
                    {subcategories}
                </ul>
            </div>
        );
    }

    return null;
};
const CmsPage = () => {
    return (
        <div className="CmsPage">
            CMS
        </div>
    );
};
const Checkbox = props => {
  const { name } = props;

  return (
    <div className="Checkbox">
      <input type="checkbox" name={name} />
      <i className="icofont-tick-boxed" />
      <i className="empty" />
    </div>
  );
};
const Radio = props => {
  const { name } = props;

  return (
    <div className="Radio">
      <input type="radio" name={name} />
      <i className="icofont-tick-boxed" />
      <i className="empty" />
    </div>
  );
};
const About = () => {
    if (oPageData && oPageData.aPages) {
        const aboutus = oPageData.aPages.map(element => {
            return (
                <li>
                    <div>
                        <h1>{element.sName}</h1>
                        <div dangerouslySetInnerHTML={{ __html: element.sDescriptionShort }} />
                    </div>
                </li>
            );
        });
        return (
            <div className="About">
                <ul>
                    {aboutus}
                </ul>
            </div>
        );
    }
};

const Homepage = () => {
    return (
    <div className="Homepage">
      <TopBanner />
      <Popular />
      <About />
    </div>
  );
};
const Popular = () => {
    if (oPageData && oPageData.aProducts) {
        const products = oPageData.aProducts.map(element => {
            return (
                <li>
                    <h2>
                        <Link href={element.sLinkName}>{element.sName}</Link>
                    </h2>
                    <div class="photo">
                        <Link href={element.sLinkName}>
                            <img src={element.sImage.sFileName} alt={element.sName} />
                        </Link>
                    </div>
                    <div class="price">
                        <em>Cena: </em>
                        <strong>{element.mPrice}</strong>
                        <span>zł</span>
                    </div>
                </li>
            );
        });
    
    return (
        <div className="Popular">
            <span>Popularne</span>
            <ProductList notitle/>
        </div>
    );
    }
};
const TopBanner = () => {
    const convert = element => {
        return (
            <li>
                <img src={element.sSizedImageLink} />
            </li>
        );
    };

    let imagesLeft = null;
    if (oPageData && oPageData.aImages && oPageData.aImages.left) {
        imagesLeft = (
            <ul class="imagesList" id="imagesList1">
                {oPageData.aImages.left.map(convert)}
            </ul>
        );
    }

    let imagesRight = null;
    if (oPageData && oPageData.aImages && oPageData.aImages.right) {
        imagesRight = (
            <ul class="imagesList" id="imagesList2">
                {oPageData.aImages.right.map(convert)}
            </ul>
        );
    }

    return (
        <div className="TopBanner">
            <div>
                {imagesLeft}
                {imagesRight}
            </div>
        </div>
    );
};
const Gallery = () => {
    if (oPageData && oPageData.aImages && oPageData.aImages.left) {
        const images = oPageData.aImages.left.map(element => {
            return (
                <li>
                    <div className="nav">
                        <img src={element.sSizedImageLink} alt={element.sAlt} />
                    </div>
                    <div className="main">
                        <img src={element.sSizedImageLink} alt={element.sAlt} />
                    </div>
                </li>
            );
        });

        return (
            <div className="Gallery">
                <ul>
                    {images}
                </ul>
            </div>
        );
    }

    return (
        <div className="Gallery"/>
    );
};
const Product = () => {
    return (
        <div className="Product">
            <Gallery/>
            <Title/>
            <Specification/>
            <Reviews/>
            <Shipping/>
        </div>
    );
};
const Reviews = () => {
  return (
    <div className="Reviews">
      <ul>
        <li>
          <div>
            <h2>Tomasz napisała123:</h2>
            <h1>Świetny zakup</h1>
            <div>
              <span>
                Super zabawka, miła i ze świetnego materiału. Córka jest
                zachwycona
              </span>
            </div>
            <div className="rating">
              <span>Ocena:</span>
              <span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h2>Tomasz napisał:</h2>
            <h1>Świetny zakup</h1>
            <div>
              <span>
                Super zabawka, miła i ze świetnego materiału. Córka jest
                zachwycona
              </span>
            </div>
            <div className="rating">
              <span>Ocena:</span>
              <span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h2>Tomasz napisał:</h2>
            <h1>Świetny zakup</h1>
            <div>
              <span>
                Super zabawka, miła i ze świetnego materiału. Córka jest
                zachwycona
              </span>
            </div>
            <div className="rating">
              <span>Ocena:</span>
              <span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h2>Tomasz napisał:</h2>
            <h1>Świetny zakup</h1>
            <div>
              <span>
                Super zabawka, miła i ze świetnego materiału. Córka jest
                zachwycona
              </span>
            </div>
            <div className="rating">
              <span>Ocena:</span>
              <span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h2>Tomasz napisał:</h2>
            <h1>Świetny zakup</h1>
            <div>
              <span>
                Super zabawka, miła i ze świetnego materiału. Córka jest
                zachwycona
              </span>
            </div>
            <div className="rating">
              <span>Ocena:</span>
              <span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <h2>Tomasz napisał:</h2>
            <h1>Świetny zakup</h1>
            <div>
              <span>
                Super zabawka, miła i ze świetnego materiału. Córka jest
                zachwycona
              </span>
            </div>
            <div className="rating">
              <span>Ocena:</span>
              <span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2605;</span>
                <span>&#x2606;</span>
                <span>&#x2606;</span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

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
const Title = () => {
  return (
    <div className="Title">
        <h1>{oPageData.sName}</h1>
        <span>{oPageData.mPrice} PLN</span>
        <Submit
            href={sCartPage}
            action={(event) => addToCart(event.currentTarget, oPageData.iProduct)}>
            Dodaj do koszyka
        </Submit>
    </div>
  );
};
const ProductList = (config) => {
    if (oPageData && oPageData.aProducts) {
        const products = oPageData.aProducts.map(element => {
            const img = element.sImage ? element.sImage.sFileName : sDirImg + 'no-image.png';
            const name = element.sName.length > 27 ? element.sName.substring(0, 25) + '...' : element.sName;
            
            const nameBlock =
                config.notitle ?
                null :                     
                <div class="name">
                    <h3>
                        <Link href={element.sLinkName}>{name}</Link>
                    </h3>
                </div>;

            return (
                <li>
                    <div class="photo">
                        <Link href={element.sLinkName}>
                            <img src={img} alt={element.sName} />
                        </Link>
                    </div>
                    {nameBlock}
                    <div class="price">
                        <strong>{element.mPrice}</strong>
                        <span>zł</span>
                    </div>
                </li>
            );
        });
    
    return (
        <div className="ProductList">
            <ul>
                {products}
            </ul>
        </div>
    );
    }
};
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
const Footer = () => {
    function renderPages(item) {
        let content = [];
        item.forEach(element => {
            if(element.sSubContent) {
                content.push(
                    <li>
                        <div>
                            <h1>
                                <a href={element.sLinkName}>{element.sName}</a>
                            </h1>
                            <ul>
                                {renderPages(element.sSubContent)}
                            </ul>
                        </div>
                    </li>
                );
            } else {
                content.push (
                    <li>
                        <span>
                            <a href={element.sLinkName}>{element.sName}</a>
                        </span>
                    </li>
                );            
            }
        });

        return content;
    }

    const pages = renderPages(oMenu);

    return (
        <div className="Footer">
            <ul>
                {pages}
            </ul>
        </div>
    );
};
const CartIcon = () => {
  return (
    <div className="CartIcon">
        <Link href={sCartPage}>
            <i className="icofont-shopping-cart" />
        </Link>
    </div>
  );
};
const Categories = () => {
    function renderMenu(item) {
        let content = [];
        item.forEach(element => {
            if(element.sSubContent) {
                content.push(
                    <li>
                        <Link href={element.sLinkName}>{element.sName}</Link>
                        <ul class="sub1">
                            {renderMenu(element.sSubContent)}
                        </ul>
                    </li>
                );
            } else {
                content.push (
                    <li>
                        <Link href={element.sLinkName}>{element.sName}</Link>
                    </li>
                );            
            }
        });

        return content;
    }

    const menu = renderMenu(oCategories);

    return (
        <div className="Categories">
            <div className="nav">
                <i className="icofont-navigation-menu" />
            </div>
            <div>
                <div id="menu3">
                    <ul>
                        {menu}
                    </ul>
                </div>
            </div>
        </div>
    );
};
const Header = () => {
  return (
    <div className="Header">
        <div className="container">
            <Logo/>
            <UserInfo/>
            <Categories/>
            <Search />
        </div>
    </div>
  );
};
const Logo = () => {
    const logo = sDirImg + "/logo.png";
    return (
        <div className="Logo">
            <Link href="./">
                <img src={logo} alt="logo" />
            </Link>
        </div>
    );
};
const Search = () => {
  return (
    <div className="Search">
        <div className="wrapper">
            <input type="text" name="query" />
        </div>
    </div>
  );
};
const UserInfo = () => {
  return (
    <div className="UserInfo">
        <div>
            <span>Zaloguj</span>
        </div>
        <CartIcon/>
    </div>
  );
};
const useState = React.useState;
const useEffect = React.useEffect;
const useRef = React.useRef;

var showDialog = false;

const rootElement = document.getElementById("root");
const renderApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        rootElement
    );
};

Animation.init();
renderApp();

window.onpopstate = (event) => {
    Animation.start();
    renderApp();
}

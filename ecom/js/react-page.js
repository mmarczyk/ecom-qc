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
const addNavigateToCart = (target, productId) => {
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
const addToCart = (target, productId) => {
    event.preventDefault();
    
    genericFetch(
        target,
        (data, href) => {
            oPageData = data;
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
const checkoutCart = (target) => {
    event.preventDefault();
    
    genericFetch(
        target,
        (data, href) => {
            oPageData = data;
            renderApp();
        },
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: jsonToForm({
                sFirstName: oPageData.aCart.oOrder.name,
                sLastName: oPageData.aCart.oOrder.name,
                sCompanyName: oPageData.aCart.oOrder.name,
                sStreet: oPageData.aCart.oOrder.street,
                sZipCode: oPageData.aCart.oOrder.zip,
                sCity: oPageData.aCart.oOrder.city,
                sPhone: '',
                sEmail: '',
                sComment: '',
                sShippingPayment: [
                    oPageData.aCart.oOrder.shipping.id,
                    oPageData.aCart.oOrder.payment,
                    oPageData.aCart.oOrder.shipping.price
                ].join(';'),
                iRules: 1,
                iRulesAccept: 1,
                sOrderSend: true
            })
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
const removeFromCart = (target) => {
    event.preventDefault();
    
    genericFetch(
        target,
        (data, href) => {
            oPageData = data;
            renderApp();
        }
    );
    
    return false;
};
const removeFromCartSingle = (target, productId, quantity) => {
    event.preventDefault();
    
    quantity -= 1;

    if(quantity > 0) { 
        genericFetch(
            target,
            (data, href) => {
                oPageData = data;
                renderApp();
            },
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'aProducts['+productId+']='+quantity
            }
        );
    }
    
    return false;
};
const setAcceptGdpr = () => {
    oPageData.aCart.bAcceptGdpr = !oPageData.aCart.bAcceptGdpr;
    renderApp();
}
const setAcceptRules = () => {
    oPageData.aCart.bAcceptRules = !oPageData.aCart.bAcceptRules;
    renderApp();
};
const setCity = (text) => {
    oPageData.aCart.oOrder.city = text;
    renderApp();
};
const setOrderName = (text) => {
    oPageData.aCart.oOrder.name = text;
    renderApp();
};
const setPayment = (element) => {
    oPageData.aCart.oOrder.payment = element;
    renderApp();
};
const setShippingCost = (element) => {
    oPageData.aCart.oOrder.shipping = {
        price: element.fPrice,
        id: element.iIdShipping
    };
    renderApp();
};
const setStreet = (text) => {
    oPageData.aCart.oOrder.street = text;
    renderApp();
};
const setZip = (text) => {
    oPageData.aCart.oOrder.zip = text;
    renderApp();
};
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

const jsonToForm = json => {
    let form = '';
    for(let name in json) {
        form += name + '=' + encodeURIComponent(json[name]) + '&';
    };

    return form.substring(0, form.length - 1);
};
const formatCity = (text, caretPos) => {
  return [
      text.replace(/[^A-Za-z\s-ąćęłóśżźń]/g, ""),
      caretPos
  ];
};
const formatName = (text, caretPos) => {
  return [
      text.replace(/[^A-Za-z\s-ąćęłóśżźń]/g, ""),
      caretPos
  ];
};
const formatStreet = (text, caretPos) => {
  return [
      text.replace(/[^A-Za-z\s-ąćęłóśżźń0-9/]/g, ""),
      caretPos
  ];
};
const formatZipCode = (text, caretPos) => {
  text = text.replace(/\D/g, "");

  for (let ind = text.length; ind < 5; ind++) {
    text += "_";
  }

  text = text.substr(0, 2) + "-" + text.substr(2, 3);
  if(text == '__-___') {
      caretPos = 0;
  } else if(caretPos == 3 && text.charAt(3) != '_') {
      caretPos += 1;
  }
  
  return [
      text,
      caretPos
  ];
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
const Submit = ({className, href, action, disabled, children}) => {
    if(disabled) {
        if(className)
            className += " disabled";
        else
            className = "disabled";

        return (
            <a className={className}>{children}</a>
        );
    }
    return (
        <a className={className} href={href} onClick={action}>{children}</a>
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
    useEffect(() => window.scrollTo(0, 0));

    if(oPageData.aCart && (typeof oPageData.aCart === 'object')){
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
    }
    else {
        return (
            <div className="Cart">
                Koszyk jest pusty
            </div>
        )
    }
};
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
const Payments = () => {
    if(oPageData && oPageData.aPayments) {
        const payments = oPageData.aPayments.map(element => {
            return (
                <li>
                    <Radio
                        name="payment"
                        action={() => setPayment(element.iIdPayment)}
                        checked={
                            oPageData.aCart.oOrder.payment === element.iIdPayment
                    }/>
                    <span>{element.sName}</span>
                </li>
            );
        });
        
        return (
            <div className="Payments">
                <h1>Płatność</h1>
                <ul>
                    {payments}
                </ul>
            </div>
        );
    }
};
const Summary = () => {
    const [amount, shipping, total] = [
        oPageData.aCart.fTotalAmount,
        oPageData.aCart.oOrder.shipping.price,
        changePriceFormat(parseFloat(oPageData.aCart.fTotalAmount)
            + parseFloat(oPageData.aCart.oOrder.shipping.price))
    ];
    const isOrderReady = () =>
        oPageData.aCart.bAcceptRules == true &&
        oPageData.aCart.bAcceptGdpr == true &&
        oPageData.aCart.oOrder.shipping.id > 0 &&
        oPageData.aCart.oOrder.payment > 0 &&
        oPageData.aCart.oOrder.name.length > 0 &&
        oPageData.aCart.oOrder.street.length > 0 &&
        oPageData.aCart.oOrder.zip.length == 6 &&
        oPageData.aCart.oOrder.city.length > 0;
    
    return (
        <div className="Summary">
            <h1>Podsumowanie</h1>
            <div>
                <div>
                    <span>Koszt zakupów</span>
                    <span>{amount} zł</span>
                </div>
                <div>
                    <span>Koszt dostawy</span>
                    <span>{shipping} zł</span>
                </div>
                <div>
                    <span>Do zapłaty</span>
                    <span>{total} zł</span>
                </div>
                <div>
                    <Submit
                        href={sOrderPage}
                        action={(event) => checkoutCart(
                            event.currentTarget
                        )}
                        disabled={
                            !isOrderReady()}
                    >
                        Zamów
                    </Submit>
                </div>
            </div>
        </div>
    );
};
const Amount = props => {
    return (
        <div className="Amount">
            <Submit
                href={sCartPage}
                action={(event) => removeFromCartSingle(
                    event.currentTarget, 
                    props.product.iProduct,
                    props.product.iQuantity
                )}
                disabled={props.product.iQuantity === 1}>
                <i className="icofont-rounded-down" />
            </Submit>
            <span>{props.product.iQuantity}</span>
            <Submit
                href={sCartPage}
                action={(event) => addToCart(
                    event.currentTarget, 
                    props.product.iProduct
                )}>
                <i className="icofont-rounded-up" />
            </Submit>
        </div>
    );
};
const List = () => {
    if(oPageData.aCart && (typeof oPageData.aCart === 'object')) {
        const products = oPageData.aCart.aProducts.map( (element, idx) => {
            return (
                <li>
                    <ProductItem index={idx}/>
                </li>
            );
        });
        return (
            <div className="List">
                <div>
                    <ul>
                        {products}
                    </ul>
                </div>
            </div>
        );
    }
};
const ProductItem = props => {
    if(oPageData.aCart && (typeof oPageData.aCart === 'object')) {
        if(props.index in oPageData.aCart.aProducts) {
            const product = oPageData.aCart.aProducts[props.index];
            return (
                <div className="ProductItem">
                <div>
                    <Link href={product.sLinkName}>
                        <img src={product.sImage} alt={product.sName} />
                    </Link>
                </div>
                <div>
                    <div>
                        <span>{product.sName}</span>
                    </div>
                    <div>
                        <span>{product.fPrice} zł</span>
                        <Amount product={product}/>
                        <span>{product.fSummary} zł</span>
                        <Submit
                            className="Remove"
                            href={product.sLinkDelete}
                            action={(event) =>
                                removeFromCart(event.currentTarget)}>
                            <i className="icofont-trash" />
                        </Submit>
                    </div>
                </div>
                </div>
            );
        }
    }
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
  const { name, action, checked } = props;

  return (
    <div className="Checkbox">
      <input type="checkbox" name={name} onClick={action} checked={checked}/>
      <i className="icofont-tick-boxed" />
      <i className="empty" />
    </div>
  );
};
const Radio = props => {
  const { name, action, checked } = props;

  return (
    <div className="Radio">
      <input type="radio" name={name} onClick={action} checked={checked}/>
      <i className="icofont-tick-boxed" />
      <i className="empty" />
    </div>
  );
};
const Textinput = ({name, placeholder, formatter, bind, rows, value }) => {
    const onChangeHandler = event => {
        if(formatter) {
            let caretPos = event.target.selectionStart;
            [event.target.value, caretPos] =
                formatter(event.target.value, caretPos);
            event.target.selectionEnd = event.target.selectionStart = caretPos;
        }

        if(bind) {
            bind(event.target.value);
        }
    };
    if(rows && rows > 1) {
        return (
            <textarea
                name={name}
                placeholder={placeholder}
                rows={rows}
                onChange={onChangeHandler}
            >
                {value}
            </textarea>
        );
    } else {
        return (
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                onChange={onChangeHandler}
                value={value}
            />
        );
    }
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
            action={(event) => addNavigateToCart(event.currentTarget, oPageData.iProduct)}>
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
    if(oPageData && oPageData.aShipping) {
        const shipping = oPageData.aShipping.map(element => {
            return (
                <li>
                    {props.editable && <Radio name="carrier"
                        action={() => setShippingCost(element)}
                        checked={
                            oPageData.aCart.oOrder.shipping.id === element.iIdShipping
                        }/>
                    }
                    <span>{element.sName}: {element.fPrice} zł</span>
                </li>
            );
        });

        return (
            <div className={props.editable ? "Shipping editable" : "Shipping"}>
                <h1>Dostawa</h1>
                <ul>
                    {shipping}
                </ul>
            </div>
        );
    }
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

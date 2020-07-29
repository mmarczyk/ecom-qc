
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
    const appendHref = (target) => {
        const json = target.search === '' ? '?json' :'&json';
        return [
            target.href,
            target.href + json
        ];
    }
    const navigateTo = (event) => {
        event.preventDefault();

        const [orgHref, href] = appendHref(event.currentTarget);

        fetch(href)
            .then(response => response.json())
            .then((data) => {
                history.pushState({href: orgHref}, '', orgHref);
                oPageData = data;
                Animation.start();
                renderApp();
            });

        return false;
    }

    return (
        <a href={href} onClick={navigateTo}>{children}</a>
    );
}
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
const Search = () => {
  return (
    <div className="Search">
        <div className="wrapper">
            <input type="text" name="query" />
        </div>
    </div>
  );
};
const CartIcon = () => {
  return (
    <div className="CartIcon">
        <i className="icofont-shopping-cart" />
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
const ProductList = () => {
    return (
        <div className="ProductList">
            ProductList
        </div>
    );
};
const Subcategories = () => {
    if ('aPages' in oPageData) {
        const subcategories = oPageData.aPages.map(element => {
            return (
                <li>
                    <Link href={element.sLinkName}>
                        <h1>{element.sName}</h1>
                        <img src={element.sImage.sFileName}/>
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
const Description = () => {
    return (
        <div className="Description">
            <h1>{oPageData.sName}</h1>
            <div dangerouslySetInnerHTML={{ __html: oPageData.sDescriptionShort }} />
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
const CmsPage = () => {
    return (
        <div className="CmsPage">
            CMS
        </div>
    );
};
const Product = () => {
    return (
        <div className="Product">
            produc
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
            <div>
                <ul>
                    {products}
                </ul>
            </div>
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
const Homepage = () => {
    return (
    <div className="Homepage">
      <TopBanner />
      <Popular />
      <About />
    </div>
  );
};
const Content = () => {
    /*useEffect(() => {
        rootElement.classList.add("visible");
    });*/

    let content = <Homepage />;
    if (window.location.search !== '') {
        content = null;
        if (window.location.search.match(/^\?\d+,.*$/)) {
            content = <Product />;
        } else if (oPageData.iProducts) {
            content = <Category />;
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
const App = () => {
    return (
        <div className="App">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    );
};
const useState = React.useState;
const useEffect = React.useEffect;
const useRef = React.useRef;

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
    console.log(event.currentTarget);
    Animation.start();
    renderApp();
}

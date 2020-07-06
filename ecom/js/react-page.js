const Categories = () => {
    function renderMenu(item) {
        let content = [];
        item.forEach(element => {
            console.log(element);
            if(element.sSubContent) {
                content.push(
                    <li>
                        <a href={element.sLinkName}>{element.sName}</a>
                        <ul class="sub1">
                            {renderMenu(element.sSubContent)}
                        </ul>
                    </li>
                );
            } else {
                content.push (
                    <li>
                        <a href={element.sLinkName}>{element.sName}</a>
                    </li>
                );            
            }
        });

        return content;
    }

    let menu = renderMenu(sCategories);
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
            <img src={logo} alt="logo" />
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
const About = () => {
  return (
    <div className="About">
      <ul>
        <li>
          <div>
            <h1>Kim jesteśmy ?</h1>
            <p>
              Jesteśmy mamami, które postanowily zrobić dla swoich dzieci coś
              nietypowego, wyjątkowego, coś co będzie im się kojarzyć z
              dzieciństwem, nawet gdy już dziećmi nie będą
            </p>
          </div>
        </li>
        <li>
          <div>
            <h1>Dlaczego to robimy ?</h1>
            <p>
              Wierzymy, że każde dziecko zasługuję na to żeby być traktowane
              wyjątkowo, a jego otoczenie powinno być inne niż wszystkie. Chcemy
              pomóc Tobie i Twojemu dziecku w znalezieniu tej oryginalności.
            </p>
          </div>
        </li>
        <li>
          <div>
            <h1>Co robimy ?</h1>
            <p>
              Tworzymy wszystko co przyjdzie według nas sprawia że nasze dzieci
              czują się niezwykłe. Chętnie słuchamy też rad i pomysłów innych
              mam i często dokładamy je do naszej listy.
            </p>
          </div>
        </li>
        <li>
          <div>
            <h1>Jak robimy ?</h1>
            <p>
              Nasi milusińscy są dla nas najważniejsi, tak jak dla Ciebie.
              Dlatego staramy się żeby nasze materiały były jak nalepszej
              jakości. Z detalami wybierami odpowiednie materiały, korzystamy
              wyłącznie ze sprawdzonych dostawców, chociaż często szukamy
              nowości.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

const Popular = () => {
  return (
    <div className="Popular">
      <span>Popularne</span>
      <div dangerouslySetInnerHTML={{ __html: sProducts }}/>
    </div>
  );
};
const TopBanner = () => {
  return (
    <div className="TopBanner">
      <div dangerouslySetInnerHTML={{ __html: sImages }}/>
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
  return (
    <div className="Content container">
        <Homepage />
    </div>
  );
};
const App = () => {
    return (
        <div className="App">
            <Header/>
            <Content/>
        </div>
    );
};
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

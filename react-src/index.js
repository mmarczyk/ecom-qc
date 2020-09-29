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

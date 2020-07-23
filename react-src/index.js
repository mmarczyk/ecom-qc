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

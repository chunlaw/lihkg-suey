import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppContextProvider } from "./AppContext.tsx";

const loadApp = () => {
  if ( document.getElementById("suey") ) {
    ReactDOM.createRoot(document.getElementById("suey")!).render(
      <React.StrictMode>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </React.StrictMode>
    );
  }
}

let observer = new MutationObserver(() => {
  if ( document.getElementsByClassName('i-telegram').length === 1 ) {
    if ( document.getElementById('suey') === null ) {
      // safe guard infinity loop
      // @ts-ignore
      var container = document.getElementsByClassName('i-telegram')[0].parentNode.parentNode.parentNode.childNodes[0]
      var suey = document.createElement("div")
      suey.setAttribute("id", "suey")
      container.appendChild(suey)
      loadApp()
    }
  }
});
observer.observe(document, { childList: true, subtree: true });

loadApp()
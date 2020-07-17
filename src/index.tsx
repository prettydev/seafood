import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./styles/sah.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../src/js/custom";
import "sanitize.css/sanitize.css";
import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "video-react/dist/video-react.css";
// import "normalize.css"

import * as React from "react";
import { render, hydrate } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import history from "./utils/history";
import App from "./containers/App";
import LanguageProvider from "./containers/LanguageProvider";
import { translationMessages } from "./i18n";
import configureStore from "./configureStore";
import Modal from "react-modal";

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById("root") as HTMLElement;
Modal.setAppElement("#root");

const defRender = (messages: any, Component = App) => {
  const actionFunction = MOUNT_NODE.hasChildNodes() ? hydrate : render;
  actionFunction(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

// Chunked polyfill for browsers without Intl support
if (!(window as any).Intl) {
  new Promise((resolve) => {
    resolve(import("intl"));
  })
    // .then(() => Promise.all([import('./intl/locale-data/jsonp/en.js'), import('./intl/locale-data/jsonp/de.js')]))
    .then(() => defRender(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  defRender(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
//if (process.env.NODE_ENV === 'production') {
//    require('offline-plugin/runtime').install();
//}

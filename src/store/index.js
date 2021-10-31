import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import combinedReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

export default createStore(
  combinedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    ...(process.browser
      ? window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.location.hostname === "localhost"
          ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
          : []
        : []
      : [])
  )
);

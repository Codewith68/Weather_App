import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/index";

// only call the extension if it's actually a function (some environments
// expose a non-callable object, causing a TypeError at startup).
const reduxDevtools =
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function'
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;

// debug: verify thunk import
console.log("thunk middleware:", thunk, "typeof", typeof thunk);

// build enhancer list without undefined entries
const enhancers = [applyMiddleware(thunk)];
if (reduxDevtools) enhancers.push(reduxDevtools);

export const store = createStore(
    rootReducer,
    compose(...enhancers)
);
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./store/reducers";
import setAuthToken from "./utils/setAuthToken";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"]
};

const pReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export { persistor, store };

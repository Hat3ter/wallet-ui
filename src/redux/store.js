import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';
import cardReducer from "./cardReducer";

const store = createStore(
    cardReducer,
    applyMiddleware(thunk)
);

export default store;

import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./rootReducers";
import thunk from 'redux-thunk'

const store = createStore(rootReducers,compose(applyMiddleware(thunk)))

export default store
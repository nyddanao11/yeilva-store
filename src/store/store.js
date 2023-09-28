// store.js
import { createStore } from 'redux';
import rootReducer from './reducers/index.js'; // You'll define your reducers

const store = createStore(rootReducer);

export default store;



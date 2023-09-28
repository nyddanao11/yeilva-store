// store.js
import { createStore } from 'redux';
import rootReducer from './reducers/index.js'; // You'll define your reducers

const reduceFn = (state={counter:0}, action) => {
	return state;

}

const store = createStore(reduceFn);

export default store;



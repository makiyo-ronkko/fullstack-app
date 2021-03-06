import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';

const initialState = {};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

// store subscribe(listener)
// user token in localStorage
// initialize current state
let currState = store.getState();

store.subscribe(() => {
	let preState = currState;
	currState = store.getState();
	if (preState.auth.token !== currState.auth.token) {
		const token = currState.auth.token;
		setAuthToken(token);
	}
});

export default store;

import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import listReducers from './reducers';


const combinedReducers = combineReducers({
    data: listReducers
    
})

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
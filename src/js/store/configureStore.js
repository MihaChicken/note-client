import { createStore,
    applyMiddleware } from 'redux'
import thunk          from 'redux-thunk'
import reducers from '../reducers'
import apiMiddleware from '../middlewares/apiMiddleware'

const initialState = {
    notes: {
        isLoading: false,
        collection: []
    }
};

export default () => createStore(reducers,
    initialState,
    applyMiddleware(thunk, apiMiddleware));
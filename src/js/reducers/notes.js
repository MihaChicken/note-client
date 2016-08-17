import _ from 'lodash';

import { ActionTypes } from '../utils/constants';

const onRequest = (state, action) => {
    return _.extend({}, state, {
        isLoading: true
    });
};

const onFailure = (state, action) => {
    return _.extend({}, state, {
        error    : {
            response: action.response,
            retry   : action.retry
        },
        isLoading: false
    });
};

export default function (state = {}, action = {}) {

    const reducer = {
        [ActionTypes.LOAD_NOTES.REQUEST] : onRequest,
        [ActionTypes.ADD_NOTE.REQUEST]   : onRequest,
        [ActionTypes.EDIT_NOTE.REQUEST]  : onRequest,
        [ActionTypes.DELETE_NOTE.REQUEST]: onRequest,

        [ActionTypes.LOAD_NOTES.FAILURE] : onFailure,
        [ActionTypes.ADD_NOTE.FAILURE]   : onFailure,
        [ActionTypes.EDIT_NOTE.FAILURE]  : onFailure,
        [ActionTypes.DELETE_NOTE.FAILURE]: onFailure,


        [ActionTypes.LOAD_NOTES.SUCCESS]: (state, action) => {
            return {
                collection: action.response.data,
                isLoading : false,
                error     : null
            };
        },

        [ActionTypes.ADD_NOTE.SUCCESS]: (state, action) => {
            const collection = state.collection;
            collection.push(action.response.data);
            return {
                collection,
                isLoading : false,
                error     : null
            };
        },

        [ActionTypes.EDIT_NOTE.SUCCESS]: (state, action) => {
            const collection = state.collection;
            const note = _.find(collection, {id: action.response.data.id});
            _.extend(note, action.response.data);
            return {
                collection,
                isLoading : false,
                error     : null
            };
        },

        [ActionTypes.DELETE_NOTE.SUCCESS]: (state, action) => {
            return {
                collection: _.reject(state.collection, action.response.data),
                isLoading : false,
                error     : null
            };
        }

    }[action.type];

    return reducer ? reducer(state, action) : state;
}
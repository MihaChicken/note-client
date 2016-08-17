import {ApiEndpointsNames, HttpMethods as HTTP} from '../utils/constants';
import _ from 'lodash';

const ApiActions = {
    loadNotes() {
        return {
            [HTTP.GET]: ApiEndpointsNames.LOAD_NOTES
        };
    },

    addNote(params) {
        return {
            [HTTP.POST]: ApiEndpointsNames.ADD_NOTE,
            params
        };
    },

    editNote(params) {
        return {
            [HTTP.PUT]: ApiEndpointsNames.EDIT_NOTE,
            urlParams : {
                id: params.id
            },
            params
        };
    },

    deleteNote(id) {
        return {
            [HTTP.DELETE]: ApiEndpointsNames.DELETE_NOTE,
            urlParams    : {id}
        };
    }
};

export default ApiActions;
import _ from 'lodash';

export const SERVER_PATH = API_URL || 'http://localhost:8080/';

export const HttpMethods = {
    GET   : 'get',
    POST  : 'post',
    PUT   : 'put',
    PATCH : 'patch',
    DELETE: 'delete'
};

export const ApiEndpoints = {
    LOAD_NOTES : SERVER_PATH + 'notes/',
    ADD_NOTE   : SERVER_PATH + 'notes/',
    EDIT_NOTE  : SERVER_PATH + 'notes/<%=id%>',
    DELETE_NOTE: SERVER_PATH + 'notes/<%=id%>'
};

/**
 * Generated constants for api endpoints names
 * @type {Object}
 */
export const ApiEndpointsNames = _.mapValues(ApiEndpoints, (v, key) => key);

const actionTypes = {};

/**
 * Generated actions for each of API endpoints
 * @type {Object}
 */
const apiActionTypes = _.mapValues(ApiEndpoints, (v, key) => ({
    'REQUEST': `${key}_REQUEST`,
    'SUCCESS': `${key}_SUCCESS`,
    'FAILURE': `${key}_FAILURE`
}));

export const ActionTypes = _.extend({}, actionTypes, apiActionTypes);
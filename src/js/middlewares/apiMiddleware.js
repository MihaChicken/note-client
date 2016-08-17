import _             from 'lodash';
import http          from 'axios';
import {
    HttpMethods,
    ActionTypes,
    ApiEndpoints
} from '../utils/constants';

const DEFAULT_CONFIG = {};

/**
 * If there are some urlParams, it will be passed to url template.
 * @param {String} apiEndpointName - url or lodash template
 * @param {Object} action          - action description
 *
 * @returns {String} - url
 */
function makeUrl(apiEndpointName, action) {
    let url = ApiEndpoints[apiEndpointName];
    if (_.isObject(action.urlParams)) {
        return _.template(url)(action.urlParams);
    }
    return url;
}

/**
 * Parse action object to get request configuration.
 * @param {Object} action     - action description
 * @param {String} httpMethod - one of HttpMethods (@see constance)
 *
 * @returns {{actionType: *, url: *, config: {}}} - request config
 */
function getRequestInfo(action, httpMethod) {
    let apiEndpointName = action[httpMethod];
    let actionType      = ActionTypes[apiEndpointName];
    let url             = makeUrl(apiEndpointName, action);
    let info            = {actionType, url, config: DEFAULT_CONFIG};

    if (_.includes([HttpMethods.GET, HttpMethods.DELETE], httpMethod)) {
        info.data = _.extend({params: action.params}, info.config)
    } else {
        info.data = action.params;
    }

    return info;
}

/**
 * Middleware that performs asynchronous http requests
 * If action contains key that contains in httpsMethods (@see constants) it will be defined as request action
 */
export default store => next => action => {
    let httpMethod = _.intersection(_.keys(action), _.values(HttpMethods))[0];
    if (httpMethod) {
        let {actionType, url, data, config} = getRequestInfo(action, httpMethod);
        action.type = action.type || actionType.REQUEST;

        http[httpMethod](url, data, config)
            .then(response => store.dispatch({type: actionType.SUCCESS, response, urlParams: action.urlParams}))
            .catch(response => store.dispatch({
                type     : actionType.FAILURE,
                response,
                urlParams: action.urlParams,
                retry    : () => store.dispatch(action)
            }));
    }

    return next(action);
}
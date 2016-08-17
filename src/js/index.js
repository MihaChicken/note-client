import React                from 'react'
import ReactDOM             from 'react-dom'
import Container            from './components/Container'
import configureStore       from './store/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';

import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import reducers from './reducers'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store        = configureStore();
const windowOnLoad = new Promise(res => window.onload = res);

windowOnLoad.then(() => {
    const target = document.getElementById('root');
    const node   = (
        <Provider store={store}>
            <MuiThemeProvider>
                <Container />
            </MuiThemeProvider>
        </Provider>
    );

    ReactDOM.render(node, target);
});

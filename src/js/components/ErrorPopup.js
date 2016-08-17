import React from 'react';
import _     from 'lodash';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Component for error handling.
 * Will be rendered if there are some error that hasn't been shown to user yet.
 * Allows to retry some actions if it fails.
 */
export class ErrorPopup extends React.Component {
    static propTypes = {
        error: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            errorHandled: false
        }
    }

    componentWillReceiveProps() {
        this.setState({errorHandled: false});
    }

    render() {
        const {error} = this.props;

        if (!_.isObject(error)) {
            return (<div/>);
        }

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => this.setState({errorHandled: true})}
                />,
            <FlatButton
                label="Retry"
                keyboardFocused={true}
                primary={true}
                onTouchTap={_.flow(() => this.setState({errorHandled: true}), error.retry)}
                />
        ];

        let errors =_.get(error.response, '.response.data.errors');
        let message = 'Reason unknown';
        if (_.isArray(errors)) {
            message = _.chain(errors).map(error => error.messages).union().join(', ').value();
        }

        return (
            <Dialog
                title={String(error.response)}
                actions={actions}
                modal={true}
                open={!this.state.errorHandled}>
                {`Cannot
                ${_.get(error.response, '.config.method') || 'reach'}
                ${_.get(error.response, '.config.url') || 'url'}`}
                <br/>
                {message}
            </Dialog>
        );
    }
}

export default ErrorPopup;

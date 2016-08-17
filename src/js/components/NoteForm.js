import React from 'react';
import _     from 'lodash';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
 * Form component for adding new or editing existing note.
 */
export class NoteForm extends React.Component {
    static propTypes = {
        note    : React.PropTypes.object,
        isOpen  : React.PropTypes.bool,
        onSave  : React.PropTypes.func,
        onCancel: React.PropTypes.func
    };

    componentWillReceiveProps() {
        this.setState({errorHandled: false});
    }

    render() {
        const {note, onCancel, isOpen} = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => onCancel()}
                />,
            <RaisedButton
                label="Save"
                keyboardFocused={true}
                primary={true}
                onTouchTap={() => this.onSave()}
                />
        ];

        return (
            <Dialog
                title={_.isObject(note) ? 'Edit note' : 'New note'}
                actions={actions}
                modal={true}
                autoScrollBodyContent={true}
                open={isOpen}>
                <TextField
                    defaultValue={_.isObject(note) ? note.title : ''}
                    floatingLabelText="Title"
                    ref="title"
                    />
                <br/>
                <TextField
                    defaultValue={_.isObject(note) ? note.description : ''}
                    floatingLabelText="Description"
                    multiLine={true}
                    fullWidth={true}
                    rowsMax={10}
                    ref="description"
                    />
            </Dialog>
        );
    }

    onSave() {
        this.props.onSave(_.extend(this.props.note || {}, {
            title      : this.refs.title.getValue(),
            description: this.refs.description.getValue()
        }));
    }
}

export default NoteForm;

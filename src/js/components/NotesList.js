import React                  from 'react';
import _                      from 'lodash';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import {Row, Col, Grid}     from 'react-flexbox-grid';
import TextField            from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd           from 'material-ui/svg-icons/content/add';

import ApiActions from '../actions/ApiActions';
import ErrorPopup from './ErrorPopup';
import Note       from './Note';
import NoteForm   from './NoteForm';

import style from '../../scss/noteList.scss';

let mapStateToProps = state => _.pick(state, 'notes');

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ApiActions, dispatch)
});

/**
 * Component for displaying notes list.
 * Connected to store.
 * Responsible for:
 *  - Adding new notes;
 *  - Editing existing;
 *  - Deleting;
 *  - Search.
 *
 *  Search is performed through the state of component.
 */
export class NotesList extends React.Component {
    static propTypes = {
        notes  : React.PropTypes.object.isRequired,
        actions: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            searchPattern : '',
            isNoteFormOpen: false,
            noteToEdit    : null,
            noteToDelete  : null
        }
    }

    componentDidMount() {
        this.props.actions.loadNotes();
    }

    generateNotes(notesCollection) {
        const {searchPattern} = this.state;

        return _.chain(notesCollection)
            .filter(note => _.isEmpty(searchPattern) || _.includes(note.title, searchPattern))
            .map((note, key) => <Note
                note={note}
                onEdit={note => this.setState({isNoteFormOpen: true, noteToEdit: note})}
                onDelete={this.deleteNote.bind(this)}
                key={key}
                />)
            .value();
    }

    render() {
        const {collection, isLoading, error} = this.props.notes;
        const {isNoteFormOpen, noteToEdit, noteToDelete} = this.state;
        let notes = this.generateNotes(collection);

        if (_.isEmpty(notes) && !isLoading) {
            notes = (<i className={style.emptyList}>
                There is no notes {_.isEmpty(collection) ? 'yet' : 'for this search pattern'} :(
            </i>);
        }

        return (
            <div>
                {notes.isLoading ? <LinearProgress mode="indeterminate"/> : ''}
                <Row center='md'>
                    <Col xs={12} md={7} lg={5}>
                        <TextField
                            className={style.searchBox}
                            hintText="Type anything"
                            floatingLabelText="Search..."
                            fullWidth={true}
                            onChange={e => this.setState({searchPattern: e.target.value})}
                            />
                    </Col>
                </Row>
                <Row>
                    {notes}
                </Row>

                <FloatingActionButton
                    className={style.floatButton}
                    onTouchTap={() => this.setState({isNoteFormOpen: true, noteToEdit: null})}>
                    <ContentAdd />
                </FloatingActionButton>

                <NoteForm
                    isOpen={isNoteFormOpen}
                    note={noteToEdit}
                    onCancel={() => this.setState({isNoteFormOpen: false, noteToEdit: null})}
                    onSave={note => this.saveNote(note)}
                    />

                <ErrorPopup error={error}/>
            </div>
        );
    }

    saveNote(note) {
        if (_.isNumber(note.id)) {
            this.props.actions.editNote(note);
        } else {
            this.props.actions.addNote(note);
        }
        this.setState({isNoteFormOpen: false, noteToEdit: null});
    }

    deleteNote(note) {
        this.props.actions.deleteNote(note.id);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);

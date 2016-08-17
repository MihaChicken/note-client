import React from 'react';
import _     from 'lodash';

import {Card, CardActions, CardHeader,
    CardText}     from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Col}      from 'react-flexbox-grid';

import style from '../../scss/note.scss';

/**
 * Simple component for displaying one note.
 * Provides callbacks onEdit and onDelete.
 */
export class Note extends React.Component {
    static propTypes = {
        note    : React.PropTypes.object.isRequired,
        onEdit  : React.PropTypes.func,
        onDelete: React.PropTypes.func
    };

    render() {
        let {note, onEdit, onDelete} = this.props;
        return (
            <Col xs={12} md={6} lg={4}>
                <Card className={style.note}>
                    <CardHeader
                        className={style.cardHeader}
                        title={note.title}
                        subtitle={note.description}
                        />
                    <CardActions className={style.cardActions}>
                        <FlatButton label="Edit" primary={true} onTouchTap={() => onEdit(note)}/>
                        <FlatButton label="Delete" secondary={true} onTouchTap={() => onDelete(note)}/>
                    </CardActions>
                </Card>
            </Col>
        );
    }
}

export default Note;

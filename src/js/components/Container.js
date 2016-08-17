import React            from 'react';
import _                from 'lodash';
import {Grid, Row, Col} from 'react-flexbox-grid';

import AppBar         from 'material-ui/AppBar';
import LinearProgress from 'material-ui/LinearProgress';

import NotesList  from './NotesList';

import style from '../../scss/main.scss';

export class Container extends React.Component {

    render() {
        return (
            <div>
                <AppBar
                    title="Notes"
                    iconElementLeft={<span/>}
                    className={style.appBar}
                    />
                <Grid>
                    <Row around="xs">
                        <Col xs={11} sm={10} md={9}>
                            <NotesList/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Container;

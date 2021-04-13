import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Card, Button, Message, Form } from 'semantic-ui-react';

import {
    // ContentWrapper,
    // TableWrapper,
    // DirectText,
    // Nav,
    // GroupHeader,
} from './style';

class SubmitterMainpage extends Component {
    render() {
        return (
            <Fragment>
                SubmitterMainpageSubmitterMainpageSubmitterMainpageSubmitterMainpageSubmitterMainpageSubmitterMainpageSubmitterMainpage
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitterMainpage);
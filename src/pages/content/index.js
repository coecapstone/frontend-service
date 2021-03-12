import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Dropdown, Header } from 'semantic-ui-react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import {
    ChooseFormWrapper,
    ContentWrapper,
    FormWrapper
} from './style';


// const defaultState = fromJS({
//     formtype: '',
//     list: [],
//     showSuccessToast: false,
//     tra: {
//         legal_firstname: '',
//         legal_lastname: ''
//     }
// });

class Content extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = defaultState;
    // }
    // reset() {
    //     this.setState(defaultState);
    // }

    componentDidMount() {
        this.props.getFormList();
    }

    travelRequestForm() {
        return (
            <Fragment>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field required>
                            <label>Legal First Name</label>
                            <Input placeholder='First name'
                                value={this.props.legalFirstName}
                                onChange={this.props.updateFirstName} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Legal Last Name</label>
                            <Input placeholder='Last name'
                                value={this.props.legalLastName}
                                onChange={this.props.updateLastName} />
                        </Form.Field>
                    </Form.Group>
                </Form>
                <Button secondary onClick={() => this.props.submitForm(this.props.legalFirstName, this.props.legalLastName)}>
                    Submit
                </Button>
                <Button basic color='violet' onClick={() => this.props.resetFormType()}>Reset Form Type</Button>
            </Fragment>
        );
    }

    purchaseRequestForm() {
        return (
            <Fragment>
                hh
            </Fragment>
        );
    }

    displayTravelForm() {
        const { type, showSuccessToast } = this.props;
        if (!showSuccessToast) {
            if (type === 'tra') {
                return (
                    <Fragment>
                        {this.travelRequestForm()}
                    </Fragment>
                );
            }
            else if (type === 'pur') {
                return (
                    <Fragment>
                        {this.purchaseRequestForm()}
                    </Fragment>
                );
            }
        }
    }

    displayMessage() {
        if (this.props.showSuccessToast) {
            return (
                <div>
                    <Message
                        header='Success!'
                        color='violet'
                        content='We have received your request.'
                    />
                    <Button basic color='violet' onClick={() => this.props.createAnotherRequest()}>
                        Create  Another  Request
                    </Button>
                </div>
            )
        }
    }

    displayChooseForm() {
        if (this.props.type === '' && !this.props.showSuccessToast) {
            return (
                <ChooseFormWrapper>
                    <Header as='h2'>Choose Your Form:</Header>
                    <Dropdown clearable options={Immutable.List(this.props.list).toJS()} selection
                        onChange={(e, data) => this.props.readFormType(data.value)} />
                </ChooseFormWrapper>
            );
        }
    }

    render() {
        return (
            <ContentWrapper>
                {this.displayChooseForm()}
                {this.displayMessage()}
                {this.displayTravelForm()}
            </ContentWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['content', 'list']),
        type: state.getIn(['content', 'formtype']), // state.get('content').get('formtype'),
        legalFirstName: state.getIn(['content', 'tra', 'legal_firstname']),
        legalLastName: state.getIn(['content', 'tra', 'legal_lastname']),
        showSuccessToast: state.getIn(['content', 'showSuccessToast']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFormList() {
            dispatch(actionCreators.getFormList());
        },
        readFormType(data) {
            dispatch(actionCreators.readFormType(data));
        },
        updateFirstName(e) {
            dispatch(actionCreators.updateFirstNameAction(e.target.value));
        },
        updateLastName(e) {
            dispatch(actionCreators.updateLastNameAction(e.target.value));
        },
        submitForm(firstName, lastName) {
            dispatch(actionCreators.submitForm(firstName, lastName))
        },
        createAnotherRequest() {
            dispatch(actionCreators.createAnotherRequest())
        },
        resetFormType() {
            dispatch(actionCreators.resetFormType())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
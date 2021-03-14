import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Dropdown, Header } from 'semantic-ui-react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import {
    ChooseWrapper,
    ContentWrapper,
    FormWrapper
} from './style';

class Content extends Component {

    componentDidMount() {
        this.props.getFormList();
        this.props.getAllUnitsList();
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

    displayForm() {
        const { formToSubmitType, showSuccessToast, formToSubmitSubunit } = this.props;
        if (!showSuccessToast && formToSubmitSubunit !== '') {
            if (formToSubmitType === 'tra') {
                return (
                    <Fragment>
                        {this.travelRequestForm()}
                    </Fragment>
                );
            }
            else if (formToSubmitType === 'pur') {
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
        const { formToSubmitType, formToSubmitSubunit, formToSubmitUnit, showSuccessToast, formTypeList, 
            readFormType, allUnitList, readInputUnit } = this.props;
        if ( (formToSubmitType === '' || formToSubmitSubunit === '' || formToSubmitUnit === '') && !showSuccessToast) {
            return (
                <Fragment>
                    <ChooseWrapper>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field required> <label>Choose Your Unit</label>
                                    <Dropdown clearable options={Immutable.List(allUnitList).toJS()} selection
                                     onChange={(e, data) => readInputUnit(data.value)} />
                                </Form.Field>
                                <Form.Field required> <label>Choose Your Subunit</label>
                                    <input placeholder='Last Name' />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field required> <label>Choose Your Form</label>
                                <Dropdown clearable options={Immutable.List(formTypeList).toJS()} selection
                                    onChange={(e, data) => readFormType(data.value)} />
                            </Form.Field>
                        </Form>
                    </ChooseWrapper>
                </Fragment>
            );
        }
    }

    render() {
        if (this.props.login) {
            return (
                <ContentWrapper>
                    {this.displayChooseForm()}
                    {this.displayMessage()}
                    {this.displayForm()}
                </ContentWrapper>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login']),
        allUnitList: state.getIn(['content', 'static', 'unit']),
        formTypeList: state.getIn(['content', 'static', 'list']),
        formToSubmitType: state.getIn(['content', 'formToSubmit', 'formtype']),
        formToSubmitSubunit: state.getIn(['content', 'formToSubmit', 'subunit']),
        formToSubmitUnit: state.getIn(['content', 'formToSubmit', 'unit']),
        legalFirstName: state.getIn(['content', 'tra', 'legal_firstname']),
        legalLastName: state.getIn(['content', 'tra', 'legal_lastname']),
        showSuccessToast: state.getIn(['content', 'showSuccessToast']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUnitsList() {
            dispatch(actionCreators.getAllUnitsList());
        },
        getFormList() {
            dispatch(actionCreators.getFormList());
        },
        readFormType(data) {
            dispatch(actionCreators.readFormType(data));
        },
        readInputUnit(data) {
            dispatch(actionCreators.readInputUnit(data));
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
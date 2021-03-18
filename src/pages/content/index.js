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
} from './style';

class Content extends Component {

    componentDidMount() {
        this.props.getFormList();
        this.props.getAllUnitsList();
    }

    travelRequestForm() {
        const { creatorEmail, legalFirstName, updateFirstName, legalLastName, updateLastName, departure, reason, updateDeparture,
            destination, updateDestination, submitTravelRequestForm, resetFormType,
            formToSubmitType, formToSubmitSubunit, formToSubmitUnit, updateReason} = this.props;
        const creatorNetId = creatorEmail.split('@')[0];
        const travelRequestFormData = { creatorNetId, formToSubmitType, formToSubmitSubunit, formToSubmitUnit, legalFirstName, legalLastName, departure, destination, reason };
        return (
            <Fragment>
                <Form className='travelForm'>
                    <Form.Group widths='equal'>
                        <Form.Field required> <label>Legal First Name</label>
                            <Input placeholder='First name'
                                value={legalFirstName}
                                onChange={updateFirstName} />
                        </Form.Field>
                        <Form.Field required> <label>Legal Last Name</label>
                            <Input placeholder='Last name'
                                value={legalLastName}
                                onChange={updateLastName} />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field required> <label>Departure</label>
                            <Input placeholder='City of airport'
                                value={departure}
                                onChange={updateDeparture} />
                        </Form.Field>
                        <Form.Field required> <label>Destination</label>
                            <Input placeholder=''
                                value={destination}
                                onChange={updateDestination} />
                        </Form.Field>
                    </Form.Group>
                    <Form.TextArea required label='Reason for request this travel' placeholder='No longer than 1000 characters' 
                        value={reason}
                        onChange={updateReason}/>
                </Form>
                <Button content='Submit' className='submitFormBtn' secondary onClick={() => submitTravelRequestForm(travelRequestFormData)} />
                <Button content='Reset FormType' labelPosition='left' icon='backward' color='violet' basic onClick={() => resetFormType()} />
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
                    <Message header='Success!' color='violet' content='We have received your request.' />
                    <Button content='Create Another Request' labelPosition='left' icon='edit' color='violet' 
                        className='anotherRequestBtn' onClick={() => this.props.createAnotherRequest()} />
                </div>
            )
        }
    }

    displayChooseForm() {
        const { formToSubmitType, formToSubmitSubunit, formToSubmitUnit, showSuccessToast, formTypeList, 
            readFormType, allUnitList, subunitList, readInputUnit, readInputSubunit } = this.props;
        if ( (formToSubmitType === '' || formToSubmitSubunit === '' || formToSubmitUnit === '') && !showSuccessToast) {
            return (
                <Fragment>
                    <ChooseWrapper>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field required> <label>Choose Your Unit</label>
                                    <Dropdown options={Immutable.List(allUnitList).toJS()} selection
                                     onChange={(e, data) => readInputUnit(data.value)} />
                                </Form.Field>
                                <Form.Field required> <label>Choose Your Subunit</label>
                                    <Dropdown options={Immutable.List(subunitList).toJS()} selection
                                     onChange={(e, data) => readInputSubunit(data.value)} />
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
        creatorEmail: state.getIn(['login', 'profileObj', 'email']),
        allUnitList: state.getIn(['content', 'static', 'unit']),
        subunitList: state.getIn(['content', 'static', 'subunit']),
        formTypeList: state.getIn(['content', 'static', 'list']),
        formToSubmitType: state.getIn(['content', 'formToSubmit', 'formtype']),
        formToSubmitSubunit: state.getIn(['content', 'formToSubmit', 'subunit']),
        formToSubmitUnit: state.getIn(['content', 'formToSubmit', 'unit']),
        legalFirstName: state.getIn(['content', 'tra', 'legal_firstname']),
        legalLastName: state.getIn(['content', 'tra', 'legal_lastname']),
        departure: state.getIn(['content', 'tra', 'departure']),
        destination: state.getIn(['content', 'tra', 'destination']),
        reason: state.getIn(['content', 'tra', 'reason']),
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
        readInputSubunit(data) {
            dispatch(actionCreators.readInputSubunit(data));
        }, 
        updateFirstName(e) {
            dispatch(actionCreators.updateFirstNameAction(e.target.value));
        },
        updateLastName(e) {
            dispatch(actionCreators.updateLastNameAction(e.target.value));
        },
        updateDeparture(e) {
            dispatch(actionCreators.updateDepartureAction(e.target.value));
        },
        updateDestination(e) {
            dispatch(actionCreators.updateDestinationAction(e.target.value));
        },
        updateReason(e) {
            dispatch(actionCreators.updateReasonAction(e.target.value));
        },
        submitTravelRequestForm(formToSubmitData) {
            dispatch(actionCreators.submitTravelRequestForm(formToSubmitData))
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
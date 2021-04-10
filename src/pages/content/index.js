import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Dropdown, Header } from 'semantic-ui-react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import {
    ChooseWrapper,
    ContentWrapper,
} from './style';

class Content extends Component {

    componentDidMount() {
        const { getFormList, getAllUnitsList } = this.props;
        getFormList();
        getAllUnitsList();
    }

    travelRequestForm() {
        const { creatorEmail, legalFirstName, updateFirstName, legalLastName, updateLastName, departure, reason, updateDeparture, allBudgetNumbers,
            destination, departing_date, returning_date, updateDestination, updateDepartureDate, updateReturningDate, submitTravelRequestForm, resetFormType,
            formToSubmitType, formToSubmitSubunit, formToSubmitUnit, updateReason, addMoreBudgetNumber, removeBudgetNumber, readInputBudget, 
            readInputAmount, budget_list, readPayFlight, whetherPayFlight, whetherToPayReturningDate, whetherToPayDepartingDate } = this.props;
        const { birthday, updateBirthday, airline, updateAirline, flightNumber, updateFlightNumber, flightFrom, updateFlightFrom, goingTo, updateGoingTo, 
            whetherToPayAmount, updateWhetherToPayAmount, updateWhetherToPayDepartingDate, updateWhetherToPayReturningDate, flightReference, updateFlightReference } = this.props;
        const creatorNetId = creatorEmail.split('@')[0];
        const budget_list_JS = budget_list.toJS();
        const whetherPayFlightFormData = { goingTo, whetherToPayAmount, whetherToPayReturningDate, whetherToPayDepartingDate, flightNumber, flightFrom, flightReference, birthday, airline }
        const travelRequestFormData = { creatorNetId, formToSubmitType, formToSubmitSubunit, formToSubmitUnit, legalFirstName, legalLastName, departure, 
            destination, departing_date, returning_date, reason, budget_list_JS, whetherPayFlight, whetherPayFlightFormData };
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
                    <Form.Group widths='equal'>
                        <Form.Field required> <label>Departing Date</label>
                            <SemanticDatepicker onChange={updateDepartureDate}/>
                        </Form.Field>
                        <Form.Field required> <label>Returning Date</label>
                            <SemanticDatepicker onChange={updateReturningDate}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.TextArea required label='Reason for request this travel' placeholder='No longer than 1000 characters' value={reason} onChange={updateReason}/>
                    <Form.Group inline>
                        <Form.Field required> <label>Budget Number</label></Form.Field> <i className='minorText'>click plus icon to split the budget</i>
                    </Form.Group>
                    {
                        budget_list.map((item, idx) => {
                            return (
                                <Form.Group key={idx}>
                                    <Dropdown className='budgetNumber' placeholder='Budget Number' options={Immutable.List(allBudgetNumbers).toJS()} selection 
                                        text={ budget_list.toJS()[idx].budget_number === '' ? 'Budget Number' : budget_list.toJS()[idx].budget_number}
                                        onChange={(e, data) => readInputBudget(data.value, idx)} />
                                    <Input placeholder='Amount' label='$' 
                                        value={ budget_list.toJS()[idx].amount === '' ? '' : budget_list.toJS()[idx].amount}
                                        onChange={(e, data) => readInputAmount(data.value, idx)}/>
                                    { idx === 0 ?  <Form.Button onClick={addMoreBudgetNumber} className='addBudgetBtn' color='violet' circular icon='plus' /> : 
                                        <Form.Button onClick={() => removeBudgetNumber(idx)} className='addBudgetBtn' color='red' circular icon='minus' />
                                    }
                                </Form.Group>
                            );
                        })
                    }
                    <Form.Group inline>
                        <Form.Field required> <label>Would you like unit to pay the flight</label> </Form.Field>
                        <Form.Radio label='Yes' value='Yes' onChange={readPayFlight} checked={whetherPayFlight === 'Yes'} />
                        <Form.Radio label='No' value='No' onChange={readPayFlight} checked={whetherPayFlight === 'No'} />
                    </Form.Group>
                </Form>
                { 
                    whetherPayFlight === 'Yes' ? 
                        <div className='whetherPayFlightForm' >
                            <Form size='tiny'>
                                <Form.Group widths='equal'>
                                    <Form.Field required> <label>Birthday</label>
                                        <Input placeholder='MM/DD/YYYY' value={birthday} onChange={updateBirthday} />
                                    </Form.Field>
                                    <Form.Field> <label>Airline</label>
                                        <Input value={airline} onChange={updateAirline} />
                                    </Form.Field>
                                    <Form.Field> <label>Flight Number</label>
                                        <Input value={flightNumber} onChange={updateFlightNumber} />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field> <label>Flight From</label>
                                        <Input value={flightFrom} onChange={updateFlightFrom} />
                                    </Form.Field>
                                    <Form.Field> <label>Going To</label>
                                        <Input value={goingTo} onChange={updateGoingTo} />
                                    </Form.Field>
                                    <Form.Field> <label>Amount</label>
                                        <Input value={whetherToPayAmount} onChange={updateWhetherToPayAmount} placeholder='0.00' label='$' />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field required> <label>Departing Date</label>
                                        <SemanticDatepicker onChange={updateWhetherToPayDepartingDate}/>
                                    </Form.Field>
                                    <Form.Field required> <label>Returning Date</label>
                                        <SemanticDatepicker onChange={updateWhetherToPayReturningDate}/>
                                    </Form.Field>
                                </Form.Group>
                                <Form.TextArea label='Flight Reference' placeholder='Window seat, flight in the morning...' value={flightReference} onChange={updateFlightReference} />
                            </Form>
                        </div> : null
                }
                <Button content='Submit' className='submitFormBtn' color='violet' onClick={() => submitTravelRequestForm(travelRequestFormData)} />
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
                    <Fragment> {this.travelRequestForm()} </Fragment>
                );
            }
            else if (formToSubmitType === 'pur') {
                return (
                    <Fragment> {this.purchaseRequestForm()} </Fragment>
                );
            }
        }
    }

    displayMessage() {
        if (this.props.showSuccessToast) {
            return (
                <Fragment>
                    <Message header='Success!' color='violet' content='We have received your request.' />
                    <Button content='Create Another Request' labelPosition='left' icon='edit' color='violet' 
                        className='anotherRequestBtn' onClick={() => this.props.createAnotherRequest()} />
                </Fragment>
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
                                     onChange={(e, data) => readInputSubunit(formToSubmitUnit, data.value)} />
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
        formToSubmitUnit: state.getIn(['content', 'formToSubmit', 'unit']),
        formToSubmitSubunit: state.getIn(['content', 'formToSubmit', 'subunit']),
        allBudgetNumbers: state.getIn(['content', 'formToSubmit', 'budget_numbers']),
        formToSubmitUnit: state.getIn(['content', 'formToSubmit', 'unit']),
        legalFirstName: state.getIn(['content', 'tra', 'legal_firstname']),
        legalLastName: state.getIn(['content', 'tra', 'legal_lastname']),
        departure: state.getIn(['content', 'tra', 'departure']),
        destination: state.getIn(['content', 'tra', 'destination']),
        departing_date: state.getIn(['content', 'tra', 'departing_date']),
        returning_date: state.getIn(['content', 'tra', 'returning_date']),
        reason: state.getIn(['content', 'tra', 'reason']),
        budget_list: state.getIn(['content', 'tra', 'budget_list']),
        showSuccessToast: state.getIn(['content', 'showSuccessToast']),
        whetherPayFlight: state.getIn(['content', 'tra', 'whether_pay_flight']),
        birthday: state.getIn(['content', 'tra', 'whether_pay_flight_form', 'birthday']),
        airline: state.getIn(['content', 'tra', 'whether_pay_flight_form', 'airline']),
        flightNumber: state.getIn(['content', 'tra', 'whether_pay_flight_form', 'flight_number']),
        flightFrom: state.getIn(['content', 'tra', 'whether_pay_flight_form', 'flight_from']),
        goingTo: state.getIn(['content', 'tra', 'whether_pay_flight_form', 'going_to']),
        whetherToPayAmount: state.getIn(['content', 'tra', 'whether_pay_flight_form', 'whether_to_pay_amount']),
        flightReference: state.getIn(['content', 'tra', 'whether_pay_flight_form', 'flight_reference']),
        whetherToPayReturningDate: state.getIn(['content', 'tra', 'whether_pay_flight_form', 'whether_to_pay_returning_date']),
        whetherToPayDepartingDate: state.getIn(['content', 'tra', 'whether_pay_flight_form', 'whether_to_pay_departing_date']),
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
        readInputSubunit(unit, subunit) {
            dispatch(actionCreators.readInputSubunit(unit, subunit));
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
        updateDepartureDate(e, data) {
            dispatch(actionCreators.updateDepartureDate(JSON.stringify(data.value).split('T')[0].substring(1)));
        },
        updateReturningDate(e, data) {
            dispatch(actionCreators.updateReturningDate(JSON.stringify(data.value).split('T')[0].substring(1)));
        },
        updateReason(e) {
            dispatch(actionCreators.updateReasonAction(e.target.value));
        },
        readInputBudget(data, idx) {
            dispatch(actionCreators.readIputBudget(data, idx));
        },
        readInputAmount(data, idx) {
            dispatch(actionCreators.readInputAmount(data, idx));
        },
        addMoreBudgetNumber() {
            dispatch(actionCreators.addMoreBudgetNumber());
        },
        removeBudgetNumber(idx) {
            dispatch(actionCreators.removeBudgetNumber(idx));
        },
        readPayFlight(e, data) {
            dispatch(actionCreators.readPayFlight(data.value));
        },
        updateBirthday(e) {
            dispatch(actionCreators.updateBirthday(e.target.value))
        },
        updateAirline(e) {
            dispatch(actionCreators.updateAirline(e.target.value))
        },
        updateFlightNumber(e) {
            dispatch(actionCreators.updateFlightNumber(e.target.value))
        },
        updateFlightFrom(e) {
            dispatch(actionCreators.updateFlightFrom(e.target.value))
        },
        updateGoingTo(e) {
            dispatch(actionCreators.updateGoingTo(e.target.value))
        }, 
        updateWhetherToPayAmount(e) {
            dispatch(actionCreators.updateWhetherToPayAmount(e.target.value))
        },
        updateWhetherToPayDepartingDate(e, data) {
            dispatch(actionCreators.updateWhetherToPayDepartingDate(JSON.stringify(data.value).split('T')[0].substring(1)));
        },
        updateWhetherToPayReturningDate(e, data) {
            dispatch(actionCreators.updateWhetherToPayReturningDate(JSON.stringify(data.value).split('T')[0].substring(1)));
        },
        updateFlightReference(e) {
            dispatch(actionCreators.updateFlightReference(e.target.value));
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
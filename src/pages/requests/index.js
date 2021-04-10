import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Card, Button } from 'semantic-ui-react';

import {
    ContentWrapper,
    TableWrapper,
    DirectText,
} from './style';

class Requests extends Component {

    componentDidMount() {
        this.props.getUserRequests(this.props.creatorEmail.split('@')[0]);
    }

    displayDetail() {
        const { detailRequest, showDetail, backToRequests, budget_list, whether_pay_flight } = this.props;
        if (showDetail) {
            console.log(detailRequest);
            const detail = Immutable.List(detailRequest).toJS()[0];
            console.log(detail);
            const whether_pay_flightJS = whether_pay_flight.toJS()
            return ( detail === undefined ? null : 
                <Fragment>
                    <Card className='card'>
                        <Card.Content>
                            <Card.Header>{detail.unitName}, {detail.subunitName} - {detail.formType}</Card.Header>
                            <Card.Meta>
                                <div className='date'>{detail.createdTime}</div>
                                <div className='date'>{detail.approvalStatus}</div>
                            </Card.Meta>
                            <Card.Description>
                                <div><b>Legal First Name</b>: {detail.legalFirstName}</div>
                                <div><b>Legal Last Name</b>: {detail.legalLastName}</div>
                                <div><b>Departure</b>: {detail.departure}</div>
                                <div><b>Destination</b>: {detail.destination}</div>
                                <div><b>Departing Date</b>: {detail.departingDate}</div>
                                <div><b>Returning Date</b>: {detail.returningDate}</div>
                                <div><b>Reason</b>: {detail.reason}</div>
                                {
                                    budget_list.map((item, idx) => {
                                        return (
                                            <div key={idx}>
                                                <b>Budget Number and Amount</b>: {budget_list.toJS()[idx].budget_number}, ${budget_list.toJS()[idx].amount}
                                            </div>
                                        );
                                    })
                                }
                                {
                                    whether_pay_flightJS.length === 0 ? <div><b>Would you like unit to pay the flight</b>: No </div> : 
                                    <Fragment>
                                        <div><b>Would you like unit to pay the flight</b>: Yes </div>
                                        <div className='whetherPayFlightCard'>
                                            <div><b>Birthday</b>: {whether_pay_flightJS.birthday} </div>
                                            <div><b>Airline</b>: {whether_pay_flightJS.airline} </div>
                                            <div><b>Flight From</b>: {whether_pay_flightJS.flightFrom} </div>
                                            <div><b>Going To</b>: {whether_pay_flightJS.goingTo} </div>
                                            <div><b>Amount</b>: {whether_pay_flightJS.whetherToPayAmount} </div>
                                            <div><b>Departing Date</b>: {whether_pay_flightJS.whetherToPayDepartingDate} </div>
                                            <div><b>Returning Date</b>: {whether_pay_flightJS.whetherToPayReturningDate} </div>
                                            <div><b>Flight Reference</b>: {whether_pay_flightJS.flightReference} </div>
                                        </div>
                                    </Fragment>
                                }
                            </Card.Description>
                        </Card.Content>
                        { detail.declinedReason ? 
                            <Card.Content extra>
                                <div><b>Declined Reason</b>: {detail.declinedReason}</div>
                            </Card.Content> : null }
                    </Card>
                    <Button basic color='violet' onClick={() => backToRequests()}>
                        Back
                    </Button>
                </Fragment>
            );
        }
    }

    displayTable() {
        const { requests, seeRequestDetail, showDetail } = this.props;
        const allUserRequests = Immutable.List(requests).toJS();
        if (!showDetail) {
            return (
                <TableWrapper>
                    <Table sortable celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    Form Type
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Unit Name
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Subunit Name
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Created Time
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Status
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Details
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {allUserRequests.map(({ id, formType, unitName, subunitName, createdTimePST, approvalStatus }) => (
                                <Table.Row key={id}>
                                    <Table.Cell>{formType}</Table.Cell>
                                    <Table.Cell>{unitName}</Table.Cell>
                                    <Table.Cell>{subunitName}</Table.Cell>
                                    <Table.Cell>{createdTimePST}</Table.Cell>
                                    <Table.Cell>{approvalStatus}</Table.Cell>
                                    <Table.Cell><DirectText onClick={() => seeRequestDetail(id)}>detail</DirectText></Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </TableWrapper>
            );
        }
    }

    render() {
        if (this.props.login) {
            return (
                <ContentWrapper>
                    {this.displayTable()}
                    {this.displayDetail()}
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
        requests: state.getIn(['request', 'requests']),
        allUnitList: state.getIn(['content', 'static', 'unit']),
        detailRequest: state.getIn(['request', 'detailRequest']),
        showDetail: state.getIn(['request', 'showDetail']),
        budget_list: state.getIn(['request', 'budget_list']),
        whether_pay_flight: state.getIn(['request', 'whether_pay_flight']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserRequests(userNetId) {
            dispatch(actionCreators.getUserRequests(userNetId));
        },
        seeRequestDetail(id) {
            console.log(id)
            dispatch(actionCreators.getRequestDetail(id));
            dispatch(actionCreators.getBudgetDetail(id));
            dispatch(actionCreators.getWhetherPayFlight(id));
        },
        backToRequests() {
            dispatch(actionCreators.backToRequests());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
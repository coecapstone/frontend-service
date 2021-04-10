import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Card, Button, Message, Form } from 'semantic-ui-react';

import {
    ContentWrapper,
    TableWrapper,
    DirectText,
    Nav,
    GroupHeader,
    NavItem,
} from './style';

class ApprovalRequests extends Component {

    componentDidMount() {
        this.props.getSubunitRequests(this.props.unit, this.props.subunit);
    }

    displayDetail() {
        const { detailRequest, detailId, backToRequests, approvalRequest, declineRequest,
            unit, subunit, showApprovedMessage, showDeclinedToast, budget_list, whether_pay_flight } = this.props;
        if (detailId !== '') {
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
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button content='Approve' onClick={() => approvalRequest(detailId)} basic color='green' />
                                <Button content='Decline' onClick={() => declineRequest()} basic color='red' />
                            </div>
                        </Card.Content>
                    </Card>
                    { showApprovedMessage ? 
                        <Message className='approveMessage' header='Approved!' color='green' content='The request status has changed.'/>
                        : null}
                    { showDeclinedToast ? 
                        <Message className='approveMessage' header='Success!' color='red' content='Your declined message has been sent.'/>
                        : null}
                    { this.showDecline() }
                    <Button basic content='Back' labelPosition='left' icon='backward' color='violet' onClick={() => backToRequests(unit, subunit)} />
                </Fragment>
            );
        }
    }

    showDecline() {
        const { showDeclineMessageInputBox, updateReason, reason, sendDeclineMessage, detailId } = this.props;
        if (showDeclineMessageInputBox) {
            return (
                <Form className='declineMessage'> 
                    <Form.TextArea required label='Reason for decline this request' placeholder='No longer than 1000 characters' 
                        value={reason}
                        onChange={updateReason}/> 
                    <Button content='Reply' labelPosition='left' icon='edit' color='red' onClick={() => sendDeclineMessage(detailId, reason)}/>
                </Form>
            );
        } else {
            return null;
        }
    }

    displayTable() {
        const { requests, seeRequestDetail, detailId } = this.props;
        const allSubunitRequests = Immutable.List(requests).toJS();
        if (detailId === '') {
            return (
                <TableWrapper>
                    <Table sortable celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    Form Creator
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Form Type
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
                            {allSubunitRequests.map(({ id, formCreator, formType, createdTimePST, approvalStatus }) => (
                                <Table.Row key={id}>
                                    <Table.Cell>{formCreator}</Table.Cell>
                                    <Table.Cell>{formType}</Table.Cell>
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

    displayApprovalWelcome() {
        return (
            <Nav>
                <GroupHeader>GENERAL USER</GroupHeader>
                <Link to={'/requests-to-approve'}>
                    <NavItem>
                        <i className="iconfont">&#xe638;</i>To Be Approved
                    </NavItem>
                </Link>
            </Nav>
        );
    }


    render() {
        if (this.props.login) {
            return (
                <Fragment>
                    {this.displayApprovalWelcome()}
                    <ContentWrapper>
                        {this.displayTable()}
                        {this.displayDetail()}
                    </ContentWrapper>
                </Fragment>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['login', 'login']),
        unit: state.getIn(['login', 'user', 'unit']),
        subunit: state.getIn(['login', 'user', 'subunit']),
        requests: state.getIn(['approvalrequest', 'requests']),
        detailRequest: state.getIn(['approvalrequest', 'detailRequest']),
        detailId: state.getIn(['approvalrequest', 'detailId']),
        showApprovedMessage: state.getIn(['approvalrequest', 'showApprovedMessage']),
        showDeclinedToast: state.getIn(['approvalrequest', 'showDeclinedToast']),
        showDeclineMessageInputBox: state.getIn(['approvalrequest', 'showDeclineMessageInputBox']),
        reason: state.getIn(['approvalrequest', 'reason']),
        budget_list: state.getIn(['request', 'budget_list']),
        whether_pay_flight: state.getIn(['request', 'whether_pay_flight']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSubunitRequests(unit, subunit) {
            dispatch(actionCreators.getSubunitRequests(unit, subunit));
        },
        seeRequestDetail(id) {
            console.log(id)
            dispatch(actionCreators.getRequestDetail(id));
            dispatch(actionCreators.getBudgetDetail(id));
            dispatch(actionCreators.getWhetherPayFlight(id));
        },
        backToRequests(unit, subunit) {
            dispatch(actionCreators.backToRequests());
            dispatch(actionCreators.getSubunitRequests(unit, subunit));
        }, 
        approvalRequest(detailId) {
            dispatch(actionCreators.approvalRequest(detailId));
        },
        declineRequest() {
            dispatch(actionCreators.showDeclineMessageInputBox());
        },
        updateReason(e) {
            dispatch(actionCreators.updateReasonAction(e.target.value));
        },
        sendDeclineMessage(detailId, reason) {
            dispatch(actionCreators.sendDeclineMessage(detailId, reason));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalRequests);
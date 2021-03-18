import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import Immutable from 'immutable';
import { Table, Card, Button, Message } from 'semantic-ui-react';

import {
    ContentWrapper,
    TableWrapper,
    DirectText,
} from './style';

class ApprovalRequests extends Component {

    componentDidMount() {
        console.log('a')
        this.props.getSubunitRequests(this.props.unit, this.props.subunit);
    }

    displayDetail() {
        const { detailRequest, detailId, backToRequests, approvalRequest, unit, subunit, showApprovedMessage } = this.props;
        if (detailId !== '') {
            const detail = Immutable.List(detailRequest).toJS()[0];
            console.log(detail);
            return (
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
                                <div><b>Reason</b>: {detail.reason}</div>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                            <Button onClick={() => approvalRequest(detailId)} basic color='green'>
                                Approve
                            </Button>
                            <Button basic color='red'>
                                Decline
                            </Button>
                            </div>
                        </Card.Content>
                    </Card>
                    { showApprovedMessage ? <Message className='approvalMessage' header='Approved!' color='green' content='The request status has changed.'/>: null}
                    <Button basic color='violet' onClick={() => backToRequests(unit, subunit)}>
                        Back
                    </Button>
                </Fragment>
            );
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
        unit: state.getIn(['login', 'user', 'unit']),
        subunit: state.getIn(['login', 'user', 'subunit']),
        requests: state.getIn(['approvalrequest', 'requests']),
        detailRequest: state.getIn(['approvalrequest', 'detailRequest']),
        detailId: state.getIn(['approvalrequest', 'detailId']),
        showApprovedMessage: state.getIn(['approvalrequest', 'showApprovedMessage']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSubunitRequests(unit, subunit) {
            dispatch(actionCreators.getSubunitRequests(unit, subunit));
        },
        seeRequestDetail(id) {
            dispatch(actionCreators.changeDetailId(id));
        },
        backToRequests(unit, subunit) {
            dispatch(actionCreators.backToRequests());
            dispatch(actionCreators.getSubunitRequests(unit, subunit));
        }, 
        approvalRequest(detailId) {
            dispatch(actionCreators.approvalRequest(detailId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalRequests);
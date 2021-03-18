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

class ApprovalRequests extends Component {

    componentDidMount() {
        this.props.getSubunitRequests(this.props.unit, this.props.subunit);
    }

    displayDetail() {
        const { detailRequest, showDetail, backToRequests } = this.props;
        if (showDetail) {
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
        const allSubunitRequests = Immutable.List(requests).toJS();
        console.log(allSubunitRequests);
        if (!showDetail) {
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
        showDetail: state.getIn(['approvalrequest', 'showDetail']),
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
        backToRequests() {
            dispatch(actionCreators.backToRequests());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalRequests);
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Button } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import Immutable from 'immutable';

import {
    ApprovalWrapper,
    DivideWrapper,
    SubmitWrapper,
    DivideBox,
    ChooseTitle,
    ChoooseDropdown,
    ChoooseBox
} from './style';

class Approval extends Component {
    render() {
        return (
            <ApprovalWrapper>
                <DivideWrapper>
                    <DivideBox>
                        <ChooseTitle> Here to Approve Requests: 
                            <ChoooseDropdown>
                                {/* role改成submitter */} 
                                <Dropdown placeholder='choose Unit Subunit' options={Immutable.List(this.props.list).toJS()} selection
                                    onChange={(e, data) => this.props.readSubunit(data.value)} />
                            </ChoooseDropdown>
                        
                        
                        </ChooseTitle>
                    </DivideBox>
                </DivideWrapper>
                <SubmitWrapper>
                    <DivideBox>
                        <ChooseTitle> Here to Submit Requests:
                            <ChoooseBox>
                                <Link to={'/'}>
                                    <Button className='chooseSubmitter'basic color='violet'>
                                        Continue
                                    </Button>
                                </Link>
                            </ChoooseBox>
                        </ChooseTitle>
                    </DivideBox>
                </SubmitWrapper>
            </ApprovalWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['login', 'approvalSubunitList']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        readSubunit(data) {
            console.log(data)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Approval);
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import Header from './common/header';
import Login from './common/login';
import SystemAdministrator from './pages/systemadministrator';
import SystemAdministratorMainpage from './pages/systemadministratormainpage';
import SystemAdministratorUnitAndSubunit from './pages/systemadministratorunitandsubunit';
import SystemAdministratorBudget from './pages/systemadministratorbudget';
import SystemAdministratorSystemAdministrator from './pages/systemadministratorsystemadministrator';
import SystemAdministratorFiscalStaff from './pages/systemadministratorfiscalstaff';
import SystemAdministratorApprover from './pages/systemadministratorapprover';
import Approver from './pages/approver';
import ApproverMainpage from './pages/approvermainpage';
import ApproverApproveRequests from './pages/approverapproverequests';
import Submitter from './pages/submitter';
import SubmitterMainpage from './pages/submittermainpage';
import SubmitterCreateRequest from './pages/submittercreaterequest';
import SubmitterMyRequests from './pages/submittermyrequests';
import { GlobalIcon } from './statics/iconfont/iconfont';
import { Globalstyle } from './style';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Globalstyle />
          <GlobalIcon/>
          <BrowserRouter>
            <div>
              {/* common header */}
              <Header />
              <Route path='/login' exact component={Login}></Route>
              {/* system administrator */}
              <Route path='/system-administrator-choose-role' exact component={SystemAdministrator}></Route>
              <Route path='/system-administrator-mainpage' exact component={SystemAdministratorMainpage}></Route>
              <Route path='/system-administrator-unit-and-subunit' exact component={SystemAdministratorUnitAndSubunit}></Route>
              <Route path='/system-administrator-budget' exact component={SystemAdministratorBudget}></Route>
              <Route path='/system-administrator-manage-system-administrator' exact component={SystemAdministratorSystemAdministrator}></Route>
              <Route path='/system-administrator-manage-fiscal-staff' exact component={SystemAdministratorFiscalStaff}></Route>
              <Route path='/system-administrator-manage-approver' exact component={SystemAdministratorApprover}></Route>
              {/* approver */}
              <Route path='/approver-choose-role' exact component={Approver}></Route>
              <Route path='/approver-mainpage' exact component={ApproverMainpage}></Route>
              <Route path='/approver-approverequests' exact component={ApproverApproveRequests}></Route>
              {/* submitter */}
              <Route path='/submitter-choose-role' exact component={Submitter}></Route>
              <Route path='/submitter-mainpage' exact component={SubmitterMainpage}></Route>
              <Route path='/submitter-create-request' exact component={SubmitterCreateRequest}></Route>
              <Route path='/submitter-my-requests' exact component={SubmitterMyRequests}></Route>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import Header from './common/header';
import Content from './pages/content';
import Login from './pages/login';
import Requests from './pages/requests';
import Approval from './pages/approval';
import ApprovalRequests from './pages/approvalrequest';
import SystemAdministrator from './pages/systemadministrator';
import SystemAdministratorMainpage from './pages/systemadministratormainpage';
import SystemAdministratorUnitAndSubunit from './pages/systemadministratorunitandsubunit';
import SystemAdministratorBudget from './pages/systemadministratorbudget';
import SystemAdministratorSystemAdministrator from './pages/systemadministratorsystemadministrator';
import SystemAdministratorFiscalStaff from './pages/systemadministratorfiscalstaff';
import SystemAdministratorApprover from './pages/systemadministratorapprover';
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
              <Route path='/choose-role-system-administrator' exact component={SystemAdministrator}></Route>
              <Route path='/system-administrator-mainpage' exact component={SystemAdministratorMainpage}></Route>
              <Route path='/system-administrator-unit-and-subunit' exact component={SystemAdministratorUnitAndSubunit}></Route>
              <Route path='/system-administrator-budget' exact component={SystemAdministratorBudget}></Route>
              <Route path='/system-administrator-manage-system-administrator' exact component={SystemAdministratorSystemAdministrator}></Route>
              <Route path='/system-administrator-manage-fiscal-staff' exact component={SystemAdministratorFiscalStaff}></Route>
              <Route path='/system-administrator-manage-approver' exact component={SystemAdministratorApprover}></Route>
              {/* approver */}
              <Route path='/choose-role-approver' exact component={Approval}></Route>
              <Route path='/requests-to-approve-approver' exact component={ApprovalRequests}></Route>
              {/* submitter */}
              <Route path='/create-request' exact component={Content}></Route>
              <Route path='/my-requests' exact component={Requests}></Route>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;

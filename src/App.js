import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import Header from './common/header';
import Content from './pages/content';
import Login from './pages/login';
import Requests from './pages/requests';
import Approval from './pages/approval';
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
              <Header />
              <Route path='/login' exact component={Login}></Route>
              <Route path='/approval-welcome' exact component={Approval}></Route>
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

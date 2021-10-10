import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import SignIn from './pages/sign-in-side/SignInSide';
import SignUp from './pages/sign-up/SignUp';
import Record from './pages/record/Record';
import Setting from './pages/setting/Setting';
import Graphies from './pages/graphies/Graphies';
import NotFound from './pages/404/';

import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";

/*
1。 注册问题 	        ✔
6。 图表问题
2。 邮箱验证问题
3。 头像问题
4。 JWT自动登录问题
5。 授权谷歌登录问题
7。 忘记账号和密码问题
*/

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={SignIn}/>
            <Route path='/dashboard' exact component={Dashboard}/>
            <Route path='/record' exact component={Record}/>
            <Route path='/graphies' exact component={Graphies}/>
            <Route path='/setting' exact component={Setting}/>
            <Route path='/register' exact component={SignUp}/>
            <Route path='*' exact={true} component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

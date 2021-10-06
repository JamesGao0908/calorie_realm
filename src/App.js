import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import SignIn from './pages/sign-in-side/SignInSide';
import SignUp from './pages/sign-up/SignUp';
import NotFound from './pages/404/';

import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={SignIn}/>
            <Route path='/dashboard' exact component={Dashboard}/>
            {/* <Route path='/login' exact component={SignIn}/> */}
            <Route path='/register' exact component={SignUp}/>
            <Route path='*' exact={true} component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

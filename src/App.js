import React from 'react';
import './App.less';
import {Route,Switch} from 'react-router-dom'
import Admin from './containers/Admin/Admin.jsx'
import Login from './containers/Login/Login.jsx'
class App extends React.Component{
  render(){
    return(
      <>
         <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
         </Switch>
      </>
    )
  }
}
export default App;


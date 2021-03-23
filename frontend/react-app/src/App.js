import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BgImage from './home.jpg'

import Navigator from './Navigator';
import Login from './Login';
import Signup from './Signup';
import WeightLog from './WeightLog';
import Target from './Target';
import Stats from './Stats';
import Whiteboard from './Whiteboard';
import Home from './Home';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      username: null
    }
  }

  onLogin = (username) => {
    this.setState({ isLoggedIn: true, username })
  }

  onLogout = () => {
    this.setState({ isLoggedIn: false, username:null })
  }

  render() {
    return (
      <div style={{
        backgroundImage: "url(" + BgImage + ")",
        height: "120%",
        width:"100%",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }}>
      <BrowserRouter>
        <div className="App">
          
          {/* navigator */}
          <Navigator isLoggedIn={this.state.isLoggedIn} username={this.state.username} onLogoutCallback={this.onLogout}/>
          <br />
          <br />
          <br />
          <Switch>

            <Route path='/frontend/home' exact render={(props)=> (<Home username={this.state.username} {...props}/>)} />
            <Route path='/frontend/login' exact render={(props) => (<Login onLoginCallback={this.onLogin} {...props} />)} />
            <Route path='/frontend/signup' exact render={(props) => (<Signup onLoginCallback={this.onLogin} {...props} />)} />
            <Route path='/frontend/wlogs' exact component={WeightLog} />
            <Route path='/frontend/target' exact component={Target} />
            <Route path='/frontend/stats' exact component={Stats} />
            <Route path='/frontend/whiteboard' exact component={Whiteboard} />

            <Redirect to='/frontend/home' />

          </Switch>

        </div>
      </BrowserRouter>
      </div>
    )
  }

}


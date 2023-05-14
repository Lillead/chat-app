import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import firebase, {auth, provider} from './firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null}
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if(user){
        this.setState({user});
      }
    })
  }
  logOutUser = () => {
    firebase.auth().signOut()
    .then(window.location = "/");
  }
  render() {
    return (
      <Router>
        <div className="app">
          <nav className="navbar navbar-expand-lg navbar-light bg-success justify-content-end">
            {!this.state.user &&
              <div className="d-flex flex-wrap">
                <Link to="/login" className="nav-link text-light m-3">Login</Link>
                <Link to="/register" className="nav-link text-light m-3">Register</Link>
              </div>
            }
            {this.state.user &&
              <a href="#!" className="nav-link text-light m-3" onClick={this.logOutUser}>Logout</a>
            }
          </nav>
          <Switch>
            <Route path="/" exact render={() => <App user={this.state.user}/>} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppRouter />);
import React from 'react';
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
        };
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            this.props.history.push('/');
            })
            .catch(error => {
                this.setState({error});
            });
    }
    render() {
        const {email, password, error} = this.state;
        return (
            <div className="auth-container d-flex justify-content-center align-items-center">
                <div className="container d-flex flex-column">
                    <h1 className="text-center m-3">Login</h1>
                    <p className="text-center">Login to access your account</p>
                    {error && <p className="error-message">{error.message}</p>}
                    <div className="form-container col-6 m-3 mx-auto">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row m-2">
                        <div className="col">
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="col">
                            <input type="text" name="email" id="email" value={email} onChange={this.handleChange} className="form-control"></input>
                        </div>
                        </div>
                        <div className="row m-2">
                        <div className="col">
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="col">
                            <input type="password" name="password" id="password" value={password} onChange={this.handleChange} className="form-control"></input>
                        </div>
                        </div>
                        <button className="submit btn btn-success m-3 mx-auto d-block">Login</button>
                    </form>
                    <p className="text-center">Don't have an account? <Link className="login-btn" to="/register">Register here</Link>.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
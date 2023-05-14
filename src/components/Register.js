import React from 'react';
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';
import Login from './Login';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: null
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        const {email, username, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            const user = firebase.auth().currentUser;
            user.updateProfile({displayName: username}).then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({error});
            });
        })
        .catch(error => {
            this.setState({error});
        })
    }
    render() {
        const {email, username, password, error} = this.state;
        return (
            <div className="auth-container d-flex justify-content-center align-items-center">
                <div className="container d-flex flex-column">
                    <h1 className="text-center m-3">Register your account</h1>
                    {error && <p className="error-message">{error.message}</p>}
                    <div className="form-container col-6 m-3 mx-auto">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row m-2">
                        <div className="col">
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="col">
                            <input type="text" name="username" id="username" value={username} onChange={this.handleChange} className="form-control"></input>
                        </div>
                        </div>
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
                            <label htmlFor="password">Choose a password</label>
                        </div>
                        <div className="col">
                            <input type="password" name="password" id="password" value={password} onChange={this.handleChange} className="form-control"></input>
                        </div>
                        </div>
                        <button className="submit btn btn-success m-3 mx-auto d-block">Get started</button>
                    </form>
                    <p className="text-center">Already have an account? <Link className="login-btn" to="/login">Login here</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;
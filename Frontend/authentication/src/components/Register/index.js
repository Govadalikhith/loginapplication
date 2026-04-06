import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import withRouter from "../withRouter";
import Cookies from "js-cookie";
import API_BASE_URL from "../../config";
import "./index.css";

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        errMsg: '',
        showErrMsg: false
    }

    onRegister = async (event) => {
        event.preventDefault()
        const { username, email, password, confirmpassword } = this.state
        
        if (password !== confirmpassword) {
            this.setState({ errMsg: "Passwords don't match", showErrMsg: true })
            return
        }

        const userDetails = { username, email, password }
        const url = `${API_BASE_URL}/register`
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(url, options)
        const data = await response.text()
        
        if (response.ok === true) {
            const { navigate } = this.props
            navigate('/login')
        } else {
            this.setState({ errMsg: data, showErrMsg: true })
        }
    }

    handleusername = (event) => {
        this.setState({ username: event.target.value })
    }
    handleemail = (event) => {
        this.setState({ email: event.target.value })
    }
    handlepassword = (event) => {
        this.setState({ password: event.target.value })
    }
    handleconfirmPassword = (event) => {
        this.setState({ confirmpassword: event.target.value })
    }

    render() {
        const { username, email, password, confirmpassword, errMsg, showErrMsg } = this.state
        const token = Cookies.get('jwt_token')
        if (token !== undefined) {
            return <Navigate to="/" />
        }

        return (
            <div className="register-container">
                <div className="register-card">
                    <h2>Create Account</h2>

                    <form onSubmit={this.onRegister}>
                        <div className="input-group">
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={this.handleusername}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={this.handleemail}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter password (min 6 chars)"
                                value={password}
                                onChange={this.handlepassword}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={confirmpassword}
                                onChange={this.handleconfirmPassword}
                                required
                            />
                        </div>

                        <button type="submit" className="register-btn">Create Account</button>
                        {showErrMsg && <p className="error-message">*{errMsg}</p>}
                    </form>

                    <p className="login-text">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);
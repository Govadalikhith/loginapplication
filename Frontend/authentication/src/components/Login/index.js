import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import withRouter from "../withRouter";
import API_BASE_URL from "../../config";
import "./index.css";

class Login extends Component {
    state = {
        username: '',
        password: '',
        errMsg: '',
        showErrMsg: false
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value })
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onSuccessLogin = (jwtToken) => {
        const { navigate } = this.props
        Cookies.set('jwt_token', jwtToken, { expires: 30 })
        navigate("/", { replace: true })
    }

    handleLogin = async (event) => {
        event.preventDefault()
        const { username, password } = this.state
        const userdetails = { username, password }
        const url = `${API_BASE_URL}/login`
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userdetails)
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
            this.onSuccessLogin(data.jwtToken)
        } else {
            this.setState({ errMsg: data.error_msg || "Invalid credentials", showErrMsg: true })
        }
    }

    render() {
        const { username, password, errMsg, showErrMsg } = this.state
        const token = Cookies.get('jwt_token')
        if (token !== undefined) {
            return <Navigate to="/" />
        }

        return (
            <div className="login-container">
                <div className="login-card">
                    <h2>User Login</h2>

                    <form onSubmit={this.handleLogin}>
                        <div className="input-group">
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={this.handleUsernameChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={this.handlePasswordChange}
                                required
                            />
                        </div>

                        <button type="submit" className="login-btn">
                            Login
                        </button>
                        {showErrMsg && <p className="error-message">*{errMsg}</p>}
                    </form>

                    <p className="register-text">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
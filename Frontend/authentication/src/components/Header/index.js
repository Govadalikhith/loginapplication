import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import withRouter from "../withRouter";
import "./index.css";

class Header extends Component {
  onClickLogout = () => {
    const { navigate } = this.props
    Cookies.remove("jwt_token")
    navigate("/login", { replace: true })
  }

  render() {
    return (
      <header className="header">
        <h1 className="logo">JobPortal</h1>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <button type="button" className="logout-btn" onClick={this.onClickLogout}>Logout</button>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
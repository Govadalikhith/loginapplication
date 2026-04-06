import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className="home-container">
          <h2>Welcome to Job Portal</h2>
          <p>Find your dream job easily 🚀</p>

          <div className="image-section">
            <img
              src="https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg"
              alt="job"
            />
            <img
              src="https://img.freepik.com/free-vector/job-search-concept-illustration_114360-203.jpg"
              alt="job search"
            />
          </div>

          <div className="home-text">
            <p>
              Explore thousands of job opportunities from top companies. 
              Build your career with the right job that matches your skills.
            </p>
            <p>
              Create your profile, apply for jobs, and get hired quickly.
            </p>
          </div>

          <div className="home-buttons">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn secondary">Register</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
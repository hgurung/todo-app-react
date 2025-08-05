import React, { Component } from 'react';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="home d-flex align-items-center justify-content-center text-center py-5">
        <div className="container">
          <h1 className="display-3 fw-bold mb-3">Manage your daily tasks</h1>
          <h2 className="display-6 text-muted">Your one and only best todo app</h2>
        </div>
      </div>
    );
  }
}

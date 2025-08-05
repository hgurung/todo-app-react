import React, { Component } from 'react'
import { NavLink } from "react-router";

export default class Header extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid justify-content-center align-items-center">
            <NavLink to="/" className="navbar-brand">todo</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mx-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link active" aria-current="page">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/todos" className="nav-link">Todos</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/todos/add" className="btn btn-info">Make your own todos</NavLink>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
  }
}

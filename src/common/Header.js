import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const hideAddOnTodos = location.pathname === '/todos'; // hide header Add on /todos if you prefer

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold text-uppercase">TodoApp</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item m-2">
              <NavLink to="/" className="nav-link" end>Home</NavLink>
            </li>
            <li className="nav-item m-2">
              <NavLink to="/todos" className="nav-link">Todos</NavLink>
            </li>
            {/* show Add button unless on /todos page (optional) */}
            {!hideAddOnTodos && (
              <li className="nav-item m-2">
                <NavLink to="/todos/add" className="btn btn-primary">Add Todo</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

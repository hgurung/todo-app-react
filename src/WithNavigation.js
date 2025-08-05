// src/WithNavigation.js
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function withNavigation(Component) {
  return function Wrapped(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
}
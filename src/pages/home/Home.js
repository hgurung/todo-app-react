import React, { Component } from 'react'
import './Home.css'
export default class Home extends Component {
  render() {
    return (
      <div className='home'>
        <div className='container justify-content-center align-items-center flex-column'>
            <h1 class="display-1">Manage your daily task here</h1>
            <h1 class="display-6">Your one and only best todo app</h1>
        </div>
      </div>
    )
  }
}

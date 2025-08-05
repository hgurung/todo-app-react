import React, { PureComponent } from 'react'

export default class Card extends PureComponent {
  render() {
    const { title, description } = this.props
    return (
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{description}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    )
  }
}

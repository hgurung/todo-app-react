import React, { Component } from 'react'
import { Link } from "react-router";
import api from '../../api/api';

export default class Add extends Component {

    state = {
        title: '',
        description: '',
        error: null,
        loading: false,
        validationError: null,
        sucessMessage: ''
    }
  
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { title, description } = this.state;
        this.setState({ loading: true, validationError: null, error: null, sucessMessage: '' })
        api.post(`api/v1/todos`, { title, description}).then(res => {
            this.setState({ title: '', description: '', sucessMessage: 'Sucessfully added to your todo list', loading: false })
        })
        .catch(error => {
            if (error && error.response && error.response.status === 400 && error.response.data.validation) {
                this.setState({ validationError: error.response.data.validation.body.message, loading: false })
            } else {
                this.setState({ error: error.message ?? 'Unable to save todos this time', loading: false})
            }

        })

    }

    render() {
        const { title, description, error, loading, validationError, sucessMessage } = this.state;
        return (
            <div className='container todos'>
                <div className="row">
                    <h2 className='m-2'>Add Todos here</h2>
                    { loading && (
                        <p>Loading....</p>
                    )}
                    <form className='m-2' onSubmit={this.handleSubmit}>
                        { sucessMessage && (
                            <p className='alert alert-sucess'>{sucessMessage}</p>
                        )}
                        { error && (
                            <p className='alert alert-danger'>{error}</p>
                        )}
                        { validationError && (
                            <p className='alert alert-danger'>{validationError}</p>
                        )}
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={title} onChange={this.handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description" value={description} onChange={this.handleChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to={`/todos`}><button type="button" className="btn btn-primary m-2">Go Back</button></Link>
                    </form>
                </div>
            </div>  
        )
    }
}

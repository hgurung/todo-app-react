import React, { Component } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';

import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
export default function ViewWrapper() {
    const { id }  = useParams()
    const navigate = useNavigate()
    return <View id={id} navigate={navigate} />
}

class View extends Component {
    state = {
        todos: null,
        error: null,
        loading: true,
    }

    componentDidMount() {
        const { id, navigate } = this.props;
        console.log('id', id)
        this.setState({ loading: true })
        api.get(`api/v1/todos/${id}`).then((res) => {
            this.setState({ todos : res.data, loading: false })
        })
        .catch(error => {
            this.setState({ error: error.message || 'Todo was not found', loading: false })
            setTimeout(() => {
                navigate('/todos')
            }, 2000)
        })
    }
    render() {
        const { todos, error } = this.state;
        return (
            <div className='container todos'>
                <div className="col-md-8">
                    <div className="card todo-content m-2">
                    <div className="card-body">
                        {error && (
                            <p className='alert alert-danger'>{error}</p>
                        )}
                        {todos && (
                            <>
                                <h5 className="card-title">{todos.title}</h5>
                                <p className="card-text">{todos.description}</p>
                                <div className='card-buttons'>
                                    <button type="button" className="btn btn-outline-info m-2"><Link to={`/todos`}>Go Back</Link></button>
                                </div>
                            </>
                        )}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import api from '../../api/api'
import './Todos.css'
export default class Todos extends Component {
    state = {
        todos: [],
        selectedTodo: null,
        loading: true,
        error: null,
        deleting: false
    }

    openModel = (e) => {
        console.log('e', e)
    }

    handleDelete = (e) => {
        const { selectedTodo, todos } = this.state
        this.setState({ deleting: true, loading: true })
        api.delete(`api/v1/todos/${selectedTodo._id}`).then(res => {
            this.setState({ selectedTodo: null, todos: todos.filter((todo) => todo._id !== selectedTodo._id), loading: false })
        })
        .catch(error => {
            this.setState({ error: error.message || 'Unable to delete it right now', loading: false})
        })
    }

    componentDidMount() {
        api.get('/api/v1/todos')
            .then((res) => {
                this.setState({ loading: false, todos: res?.data?.data ?? [] })
            })
            .catch(error => this.setState({ error: error.message || 'Unable to fetch data right now' }))

    }

    render() {
        const { todos, loading, error, selectedTodo } = this.state;

        const todoItems = todos.map((todo) =>
            <div className="col-md-3" key={todo._id}>
                <div className="card todo-content m-2">
                <div className="card-body">
                    <h5 className="card-title">{todo.title}</h5>
                    <p className="card-text">{todo.description}</p>
                    <div className='card-buttons'>
                        <button type="button" className="btn btn-outline-info m-2"><Link to={`/todos/view/${todo._id}`}><GrView/></Link></button>
                        <button type="button" className="btn btn-outline-primary m-2"><Link to={`/todos/edit/${todo._id}`}><FaEdit/></Link></button>
                        <button type="button" className="btn btn-outline-danger m-2" onClick={() => { this.setState({ selectedTodo: todo}) }}><MdDelete/></button>
                    </div>
                </div>
                </div>
            </div>
        );

        return (
            <div className='container todos'>
                <div className="row">
                    { todoItems }
                </div>

                {selectedTodo && (
                    <div className="modal d-block delete-modal" tabindex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        {/* <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { this.setState({ selectedTodo: null}) }}></button>
                        </div> */}
                        <div className="modal-body">
                            <p>Are you sure you want to delete <b>{selectedTodo.title}</b></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { this.setState({ selectedTodo: null}) }}>Close</button>
                            <button type="button" className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                        </div>
                        </div>
                    </div>
                    </div>

                    
                )}

            </div>
        )
    }
}

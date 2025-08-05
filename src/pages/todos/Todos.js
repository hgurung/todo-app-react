import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import api from '../../api/api';
import './Todos.css';
import Loader from '../../common/Loader';

export default function Todos() {

  const [viewingTodo, setViewingTodo] = useState(null);
  // Open and close view modal handlers
  const openViewModal = useCallback(todo => {
    setViewingTodo(todo);
  }, []);
  const closeViewModal = useCallback(() => {
    setViewingTodo(null);
  }, []);

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchTodos() {
      try {
        setLoading(true);
        const res = await api.get('/api/v1/todos');
        if (!cancelled) {
          setTodos(res?.data?.data ?? []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message || 'Failed to fetch todos');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchTodos();
    return () => { cancelled = true; };
  }, []);

  // lock body scroll when modal open
  useEffect(() => {
    if (selectedTodo) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedTodo]);

  const openDeleteModal = useCallback((todo) => {
    setSelectedTodo(todo);
    setDeleteError(null);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedTodo(null);
    setDeleteError(null);
  }, []);

  const handleDelete = useCallback( async () => {
    if (!selectedTodo) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await api.delete(`/api/v1/todos/${selectedTodo._id}`);
      setTodos(prev => prev.filter(t => t._id !== selectedTodo._1d && t._id !== selectedTodo._id)); // fallback safe remove
      setSelectedTodo(null);
    } catch (err) {
      setDeleteError(err.response?.data?.message || err.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  }, [selectedTodo]);

  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  if (loading) return <Loader message="Loading todos..." />;

  return (
    <div className="todos app-hero-bg">
      <div className="container">
        {/* Header row */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="m-0 d-flex align-items-center gap-2">
            Todos
            <Link to="/todos/add" className="text-white ms-2" title="Add Todo" aria-label="Add Todo">
              <FaPlus className="add-icon" style={{ fontSize: '27px', color: 'white' }} />
            </Link>
          </h2>
        </div>

        {/* Status messages */}
        {error && <div className="mb-3"><div className="alert alert-danger">{error}</div></div>}
        {!loading && !error && todos.length === 0 && (
          <div className="mb-3">
            <div className="alert alert-info">No todos yet. <Link to="/todos/add">Add one</Link></div>
          </div>
        )}

        {/* Grid */}
        <div className="todo-grid">
          {todos.map(todo => (
            <div className="card todo-content" key={todo._id}>
              <div className="card-body">
                <h5 className="card-title">{todo.title}</h5>
                <p className="card-text">{todo.description}</p>
                <div className="card-buttons">
                  <button
                    type="button"
                    className="btn btn-outline-info m-2"
                    onClick={() => openViewModal(todo)}
                    aria-label={`View ${todo.title}`}
                  >
                    <GrView />
                  </button>
                  {/* <Link to={`/todos/view/${todo._id}`} className="btn btn-outline-info m-2" aria-label={`View ${todo.title}`}><GrView/></Link> */}
                  <Link to={`/todos/edit/${todo._id}`} className="btn btn-outline-primary m-2" aria-label={`Edit ${todo.title}`}><FaEdit/></Link>
                  <button
                    type="button"
                    className="btn btn-outline-danger m-2"
                    onClick={() => openDeleteModal(todo)}
                    aria-label={`Delete ${todo.title}`}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* View Modal */}
      {/* View Modal */}
      {viewingTodo && (
        <div className="delete-modal" role="dialog" aria-modal="true" tabIndex={-1}>
          <div className="modal-backdrop show" onClick={closeViewModal} aria-hidden="true" />
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{viewingTodo.title}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeViewModal}></button>
              </div>
              <div className="modal-body">
                <p>{viewingTodo.description || <em>No description provided.</em>}</p>
                <hr />
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  <strong>Created:</strong> {formatDate(viewingTodo.createdAt)}<br />
                  <strong>Last Updated:</strong> {formatDate(viewingTodo.updatedAt)}
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeViewModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Modal */}
      {selectedTodo && (
        <div className="delete-modal" role="dialog" aria-modal="true" tabIndex={-1}>
          <div className="modal-backdrop show" onClick={closeModal} aria-hidden="true" />
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{selectedTodo.title}</strong>?</p>
                {deleteError && <div className="alert alert-danger">{deleteError}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal} disabled={deleting}>Cancel</button>
                <button type="button" className="btn btn-danger m-2" onClick={handleDelete} disabled={deleting}>
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

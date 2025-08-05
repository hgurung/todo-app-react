import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import useTodo from '../../hooks/useTodo';
import TodoForm from '../../common/TodoForm';
import Loader from '../../common/Loader';
import './Todos.css';

export default function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { todo, setTodo, loading: loadingTodo, error: loadError } = useTodo(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title ?? '');
      setDescription(todo.description ?? '');
      setError(null);
      setValidationError(null);
    }
  }, [todo]);

  useEffect(() => {
    if (loadError) setError(loadError);
  }, [loadError]);

  const validate = useCallback(() => {
    if (!title.trim()) return 'Title is required.';
    return null;
  }, [title]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validationErr = validate();
      if (validationErr) {
        setValidationError(validationErr);
        return;
      }

      setValidationError(null);
      setError(null);
      setSaving(true);

      try {
        const payload = { title: title.trim(), description };
        const res = await api.put(`/api/v1/todos/${id}`, payload);
        const updated = res?.data?.data ?? res?.data ?? payload;
        setTodo(updated);
        setSuccessMessage('Saved successfully.');

        setTimeout(() => navigate('/todos'), 700);
      } catch (err) {
        const resp = err?.response;
        if (resp?.status === 400 && resp.data?.validation) {
          setValidationError(resp.data.validation.body?.message || 'Validation failed');
        } else {
          setError(resp?.data?.message || err.message || 'Failed to update todo');
        }
      } finally {
        setSaving(false);
      }
    },
    [id, title, description, navigate, setTodo, validate]
  );

  if (loadingTodo) return <Loader message="Loading todos..." />;

  if (error && !todo) return (
    <div className="container todos">
      <div className="alert alert-danger">{error}</div>
      <Link to="/todos" className="btn btn-secondary mt-2">Back to list</Link>
    </div>
  );

  return (
    <div className="todos app-hero-bg">
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="card app-hero-card w-100" style={{ maxWidth: 720 }}>
          <div className="card-body">
            <h3 className="card-title mb-3">Edit Todo</h3>
                <TodoForm
                title={title}
                description={description}
                onTitleChange={e => setTitle(e.target.value)}
                onDescriptionChange={e => setDescription(e.target.value)}
                onSubmit={handleSubmit}
                loading={saving}
                error={error}
                validationError={validationError}
                successMessage={successMessage}
                submitLabel="Save Changes"
                showCancel
                onCancel={() => navigate('/todos')}
                />
          </div>
        </div>
      </div>
    </div>
  );
}

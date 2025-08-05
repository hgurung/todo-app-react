import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import TodoForm from '../../common/TodoForm';
import './Todos.css';

export default function AddTodo() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

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
      setLoading(true);

      try {
        await api.post('/api/v1/todos', { title: title.trim(), description });
        setSuccessMessage('Successfully added to your todo list');
        setTitle('');
        setDescription('');
        setTimeout(() => navigate('/todos'), 800);
      } catch (err) {
        const resp = err?.response;
        if (resp?.status === 400 && resp.data?.validation) {
          setValidationError(resp.data.validation.body.message);
        } else {
          setError(resp?.data?.message || err.message || 'Unable to save todo at this time');
        }
      } finally {
        setLoading(false);
      }
    },
    [title, description, navigate, validate]
  );

  return (
    <div className="todos app-hero-bg">
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="card app-hero-card w-100" style={{ maxWidth: 720 }}>
          <div className="card-body">
            <h3 className="card-title mb-3">Add a new Todo</h3>

            <TodoForm
              title={title}
              description={description}
              onTitleChange={e => setTitle(e.target.value)}
              onDescriptionChange={e => setDescription(e.target.value)}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
              validationError={validationError}
              successMessage={successMessage}
              submitLabel="Submit"
              showCancel
              onCancel={() => navigate('/todos')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function TodoForm({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  loading = false,
  error = null,
  validationError = null,
  successMessage = null,
  submitLabel = 'Submit',
  showCancel = false,
  onCancel = null,
}) {
  return (
    <form onSubmit={onSubmit} noValidate>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {validationError && <div className="alert alert-danger">{validationError}</div>}

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={`form-control${validationError ? ' is-invalid' : ''}`}
          value={title}
          onChange={onTitleChange}
          disabled={loading}
          autoFocus
          aria-describedby={validationError ? 'title-error' : undefined}
        />
        {validationError && <div id="title-error" className="invalid-feedback">{validationError}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          rows={4}
          value={description}
          onChange={onDescriptionChange}
          disabled={loading}
        />
      </div>

      <div className="d-flex align-items-center">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? `${submitLabel}...` : submitLabel}
        </button>
        {showCancel && onCancel && (
          <button type="button" className="btn btn-outline-secondary ms-3" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

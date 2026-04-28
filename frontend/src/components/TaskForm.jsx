import { useState } from 'react';
import api from '../services/api';

import './taskform.css';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/tasks', {
        title,
        description: description || undefined,
      });

      onTaskCreated(response.data.task);
      setTitle('');
      setDescription('');
      setSuccess('Task created successfully! 🎉');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-card">
      <div className="task-form-header">
        <div className="task-form-icon-wrap">
          <svg className="task-form-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.5a1 1 0 002 0V7z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="task-form-title">Create New Task</h2>
      </div>

      {error && (
        <div className="alert alert-error">
          <svg className="alert-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <svg className="alert-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="task-form">
        <div className="field-group">
          <label className="field-label">
            Task Title <span className="field-required">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-input"
            placeholder="What needs to be done?"
          />
        </div>

        <div className="field-group">
          <label className="field-label">
            Description <span className="field-optional">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-input textarea-input"
            rows={3}
            placeholder="Add more details about this task..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="task-submit-btn"
        >
          <svg className="task-submit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>{loading ? 'Creating...' : 'Add Task'}</span>
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

import '../styles/TaskDetail.css';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await api.get('/tasks');
      const foundTask = response.data.find(t => t.id === parseInt(id));
      if (!foundTask) {
        setError('Task not found');
        setLoading(false);
        return;
      }
      setTask(foundTask);
      setTitle(foundTask.title);
      setDescription(foundTask.description || '');
      setStatus(foundTask.status);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch task');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.put(`/tasks/${id}`, {
        title,
        description: description || undefined,
        status
      });
      setTask(response.data.task);
      setSuccess('Task updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update task');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusToggle = async () => {
    const newStatus = status === 'Pending' ? 'Completed' : 'Pending';
    setSaving(true);
    try {
      const response = await api.put(`/tasks/${id}`, { status: newStatus });
      setTask(response.data.task);
      setStatus(newStatus);
      setSuccess(`Task marked as ${newStatus}!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update status');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    try {
      await api.delete(`/tasks/${id}`);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="task-loading-page">
        <div className="task-loading-content">
          <div className="task-spinner"></div>
          <p className="task-loading-text">Loading task...</p>
        </div>
      </div>
    );
  }

  if (error && !task) {
    return (
      <div className="task-error-page">
        <div className="task-error-card">
          <svg className="task-error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>

          <h2 className="task-error-title">{error}</h2>

          <Link to="/" className="task-error-link">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = status === 'Completed';

  return (
    <div className="edit-task-page">
      <div className="edit-task-container">
        {/* Header */}
        <div className="edit-task-header">
          <Link to="/" className="back-link">
            <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="edit-task-title">Edit Task</h1>
        </div>

        {/* Alerts */}
        {error && (
          <div className="alert alert-error">
            <svg className="alert-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <svg className="alert-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{success}</span>
          </div>
        )}

        {/* Task Edit Form */}
        <div className="edit-task-card">
          <form onSubmit={handleUpdate} className="edit-task-form">
            {/* Status Badge */}
            <div className="status-row">
              <span className="status-label">Current Status</span>
              <button
                type="button"
                onClick={handleStatusToggle}
                disabled={saving}
                className={`status-badge ${
                  isCompleted ? "status-completed" : "status-pending"
                }`}
              >
                {isCompleted ? "✓ Completed" : "⏳ Pending"}
                <span className="status-note">(click to toggle)</span>
              </button>
            </div>

            <div className="field-group">
              <label className="field-label">Task Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-input"
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="field-group">
              <label className="field-label">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-input textarea-input"
                rows="4"
                placeholder="Enter task description (optional)"
              />
            </div>

            {/* Action Buttons */}
            <div className="action-row">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary"
              >
                {saving ? (
                  <>
                    <svg className="btn-icon spin" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>Update Task</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-danger"
              >
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </form>
        </div>

        {/* Task Info */}
        {task && (
          <div className="task-info">
            <div className="task-info-grid">
              <div>
                <span className="info-label">Created:</span>{" "}
                {new Date(task.createdAt).toLocaleString()}
              </div>
              <div>
                <span className="info-label">Last Updated:</span>{" "}
                {new Date(task.updatedAt).toLocaleString()}
              </div>
              <div>
                <span className="info-label">Task ID:</span> #{task.id}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;


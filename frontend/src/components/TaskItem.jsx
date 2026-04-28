import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import './TaskItem.css';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleStatusToggle = async () => {
    setUpdating(true);
    try {
      const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
      const response = await api.put(`/tasks/${task.id}`, {
        status: newStatus,
      });
      onUpdate(response.data.task);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update task');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/tasks/${task.id}`);
      onDelete(task.id);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete task');
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const handleEdit = () => {
    navigate(`/task/${task.id}`);
  };

  const isCompleted = task.status === 'Completed';
  const createdDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className={`task-item-card ${
        isCompleted ? 'task-item-completed' : 'task-item-pending'
      }`}
    >
      <div className="task-item-content">
        <div className="task-item-checkbox-wrap">
          <button
            onClick={handleStatusToggle}
            disabled={updating}
            className={`task-item-checkbox ${
              isCompleted ? 'task-item-checkbox-done' : 'task-item-checkbox-default'
            }`}
          >
            {isCompleted && (
              <svg className="task-item-check-icon" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="task-item-body" onClick={handleEdit}>
          <h3 className={`task-item-title ${isCompleted ? 'task-item-title-done' : ''}`}>
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`task-item-description ${
                isCompleted ? 'task-item-description-done' : ''
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="task-item-meta">
            <span
              className={`task-item-status ${
                isCompleted ? 'task-item-status-done' : 'task-item-status-pending'
              }`}
            >
              {isCompleted ? '✓ Completed' : '⏳ Pending'}
            </span>
            <span className="task-item-date">📅 {createdDate}</span>
          </div>
        </div>

        <div className="task-item-actions">
          <button
            onClick={handleEdit}
            title="Edit task"
            className="task-action-btn task-action-edit"
          >
            <svg className="task-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            onClick={handleStatusToggle}
            disabled={updating}
            title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
            className={`task-action-btn ${
              isCompleted ? 'task-action-pending' : 'task-action-complete'
            }`}
          >
            {updating ? (
              <svg className="task-action-icon spin" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 5.293a1 1 0 011.414 0L10 9.586l4.293-4.293a1 1 0 111.414 1.414L11.414 11l4.293 4.293a1 1 0 01-1.414 1.414L10 12.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 11 4.293 6.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : isCompleted ? (
              <svg className="task-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            ) : (
              <svg className="task-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            )}
          </button>

          {showConfirm && (
              <div className="task-confirm-modal">
                <p className="task-confirm-text">Delete this task?</p>
                <div className="task-confirm-actions">
                  <button onClick={handleDelete} className="task-confirm-delete">
                    Delete
                  </button>
                  <button onClick={() => setShowConfirm(false)} className="task-confirm-cancel">
                    Cancel
                  </button>
                </div>
              </div>
          )}

          <div className="task-delete-wrap">
            <button
              onClick={() => setShowConfirm(!showConfirm)}
              disabled={deleting}
              title="Delete task"
              className="task-action-btn task-action-delete"
            >
              {deleting ? (
                <svg className="task-action-icon spin" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 5.293a1 1 0 011.414 0L10 9.586l4.293-4.293a1 1 0 111.414 1.414L11.414 11l4.293 4.293a1 1 0 01-1.414 1.414L10 12.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 11 4.293 6.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="task-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </button>

            {/* {showConfirm && (
              <div className="task-confirm-modal">
                <p className="task-confirm-text">Delete this task?</p>
                <div className="task-confirm-actions">
                  <button onClick={handleDelete} className="task-confirm-delete">
                    Delete
                  </button>
                  <button onClick={() => setShowConfirm(false)} className="task-confirm-cancel">
                    Cancel
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
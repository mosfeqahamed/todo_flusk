'use client';

import { useEffect, useState } from 'react';

const API_URL = 'https://todo-flusk.onrender.com';

interface Task {
  id: number;
  task_name: string;
  status: boolean; // boolean status
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) {
      setError('Task name cannot be empty');
      return;
    }
    try {
      setError(null);
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_name: taskName }),
      });
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || 'Failed to add task');
        return;
      }
      setTaskName('');
      fetchTasks();
    } catch {
      setError('Failed to add task');
    }
  };

  const toggleTaskStatus = async (task: Task) => {
    try {
      const newStatus = !task.status;
      const res = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        setError('Failed to update task');
        return;
      }
      fetchTasks();
    } catch {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        setError('Failed to delete task');
        return;
      }
      fetchTasks();
    } catch {
      setError('Failed to delete task');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>To-Do List</h1>
      <form onSubmit={handleAddTask} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter new task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          style={{ padding: '0.5rem', width: '80%' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
          Add
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.length === 0 && <p>No tasks yet</p>}
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                padding: '0.5rem',
                borderBottom: '1px solid #ccc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <label
                style={{
                  flex: 1,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <input
                  type="checkbox"
                  checked={task.status}
                  onChange={() => toggleTaskStatus(task)}
                  style={{ cursor: 'pointer' }}
                />
                <span>{task.task_name}</span>
              </label>

              <span
                style={{
                  marginRight: '1rem',
                  color: task.status ? 'green' : 'orange',
                  fontWeight: 'bold',
                  minWidth: '80px',
                  textAlign: 'center',
                }}
              >
                {task.status ? 'Completed' : 'Pending'}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                style={{ color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

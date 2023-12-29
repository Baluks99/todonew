
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoListDashboard.css'; 



const TodoListDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [status, setStatus] = useState('ongoing');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, status, completed: false }]);
      setNewTask('');
      setStatus('ongoing');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>Todo List Dashboard</h1>

      
      <div className="add-todo">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select> 
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

     
      <div className="filter-buttons">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={filter === 'incomplete' ? 'active' : ''}
          onClick={() => setFilter('incomplete')}
        >
          Incomplete
        </button>
      </div>

  
      <ul className="todo-list">
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span className={task.completed ? 'completed' : ''}>
              {task.text} - {task.status}
            </span>
            <button className="delete-button" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListDashboard;

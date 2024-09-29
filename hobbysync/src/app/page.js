"use client"
import { useState } from 'react';
import TaskPopup from './components/TaskPopUp.js';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleSaveTask = (taskData) => {
    setTasks([...tasks, taskData]);
    };
  
    return (
      <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Task Calendar</h1>
      <button
        onClick={openPopup}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Task
      </button>

      {/* Task List */}
      <div className="mt-6">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="p-4 mb-2 border border-gray-300 rounded"
            style={{ backgroundColor: task.color }}
          >
            <h2 className="text-xl font-bold">{task.taskName}</h2>
            <p>{task.notes}</p>
            <p>Time: {task.time}</p>
            <p>Repeat: {task.repeatFrequency}</p>
            <p>
              Dates: {task.startDate} to {task.endDate}
            </p>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <TaskPopup
          onClose={closePopup}
          onSave={handleSaveTask}
        />
      )}
    </div>
    );
}

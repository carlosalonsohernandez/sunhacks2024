"use client";
import Footer from './components/Footer.js';
import Calendar from './components/Calendar.js'; // Ensure this is correctly imported
import { useState } from 'react';
import TaskPopup from './components/TaskPopUp.js'; // Ensure the correct import

export default function Home() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskToEditIndex, setTaskToEditIndex] = useState(null); // Track which task is being edited

  // Handle Year Change
  const handleYearChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 2025) value = 2024;
    if (value < 2000) value = 2000;
    setYear(value);
  };

  // Handle Month Change
  const handleMonthChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 12) value = 12;
    if (value < 1) value = 1;
    setMonth(value - 1);
  };

  // Open the popup for a new task
  const openPopup = () => {
    setTaskToEditIndex(null); // New task
    setIsPopupOpen(true);
  };

  // Close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Save a new task or update an existing one
  const handleSaveTask = (taskData) => {
    if (taskToEditIndex !== null) {
      // Update the existing task
      const updatedTasks = tasks.map((task, index) =>
        index === taskToEditIndex ? taskData : task
      );
      setTasks(updatedTasks);
    } else {
      // Save a new task
      setTasks([...tasks, taskData]);
    }
    setIsPopupOpen(false); // Close the popup after saving
  };

  // Open the popup to edit a task
  const handleEditTask = (index) => {
    setTaskToEditIndex(index);
    setIsPopupOpen(true); // Open the popup for editing
  };

  // Helper function to truncate the task name
  const truncateTaskName = (name) => {
    return name.length > 6 ? `${name.substring(0, 6)}...` : name;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="header">
        <div className="left-section">
          <div className="title">Hobbies Sync</div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 pb-4">

          <button onClick={openPopup} className="px-4 py-2 bg-green-500 text-white rounded absolute right-4">
            Add Task
          </button>

          {/* Render saved tasks as clickable tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="py-1 px-3 mb-2 border border-gray-300 rounded-full cursor-pointer text-xs"
                style={{ backgroundColor: task.color }}
                onClick={() => handleEditTask(index)}
              >
                <span>{truncateTaskName(task.taskName || 'Unnamed')}</span>
              </div>
            ))}
          </div>

          {/* Task Popup */}
          {isPopupOpen && (
            <TaskPopup
              onClose={closePopup}
              onSave={handleSaveTask}
              taskData={taskToEditIndex !== null ? tasks[taskToEditIndex] : {}}
            />
          )}

          {/* User Inputs for Month and Year */}
          <div className="container mx-auto px-4 pb-4"> 
            <div className="flex gap-4 mb-4">
              {/* Year Dropdown */}
              <div>
                <label htmlFor="year" className="block text-lg font-medium">
                  Year:
                </label>
                <select
                  id="year"
                  value={year}
                  onChange={handleYearChange}
                  className="border border-gray-300 p-2 rounded"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 2000).map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month Dropdown */}
              <div>
                <label htmlFor="month" className="block text-lg font-medium">
                  Month:
                </label>
                <select
                  id="month"
                  value={month}
                  onChange={handleMonthChange}
                  className="border border-gray-300 p-2 rounded"
                >
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
                    (monthName, index) => (
                      <option key={index} value={index}>
                        {monthName}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Render Calendar component */}
          <Calendar year={year} month={month} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

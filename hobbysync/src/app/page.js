"use client";
import Footer from './components/Footer.js';
import Calendar from './components/Calendar.js';
import { useState } from 'react';
import TaskPopup from './components/TaskPopUp.js';

export default function Home() {
  // State to manage the input values for year and month
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth()); // 0-based index (0 = January, ..., 11 = December)

  // Handlers for updating the state
  const handleYearChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 2025) value = 2024; // Ensure year is not greater than 2025
    if (value < 2000) value = 2000; // Ensure month is not less than 2000
    setYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 12) value = 12; // Ensure month is not greater than 12
    if (value < 1) value = 1; // Ensure month is not less than 1
    setMonth(value - 1); // Convert 1-based month to 0-based index
  };
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleSaveTask = (taskData) => {
    setTasks([...tasks, taskData]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="header">
        <div className="left-section">
          <div className="title">Hobbies Sync</div>

          {/* Menu section next to title */}
          <div className="menu-section">
            <div className="dropdown menu-dropdown">
              <button className="dropbtn">
                Menu <i className="arrow down"></i>
              </button>
              <div className="dropdown-content">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </div>
            </div>

            <div className="dropdown menu-dropdown">
              <button className="dropbtn">
                Extra <i className="arrow down"></i>
              </button>
              <div className="dropdown-content">
                <a href="#home">This</a>
                <a href="#about">Is</a>
                <a href="#contact">Something</a>
              </div>
            </div>

            <div className="dropdown menu-dropdown">
              <button className="dropbtn">
                Extra <i className="arrow down"></i>
              </button>
              <div className="dropdown-content">
                <a href="#home">This</a>
                <a href="#about">Is</a>
                <a href="#contact">Something</a>
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown profile-dropdown">
          <button className="dropbtnp">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile Icon"
              className="profile-icon"
            />
          </button>
          <div className="dropdown-contentp">
            <a href="#profile">Profile</a>
            <a href="#settings">Settings</a>
            <a href="#logout">Logout</a>
          </div>
        </div>
      </header>

      <main className="flex-grow">
         {/* Task Calendar Section */}
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

        {/* User Inputs for Month and Year */}
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Select Month and Year</h2>
          <div className="flex gap-4 mb-4">
            <div>
              <label htmlFor="year" className="block text-lg font-medium">
                Year:
              </label>
              <input
                id="year"
                type="number"
                value={year}
                onChange={handleYearChange}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="month" className="block text-lg font-medium">
                Month:
              </label>
              <input
                id="month"
                type="number"
                min="1"
                max="12"
                value={month + 1}
                onChange={handleMonthChange}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* Calendar for a specific month */}
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Calendar Component</h2>
          <Calendar year={year} month={month} />
        </div>
      </main>

      {/* Properly rendered Footer component */}
      <Footer />
    </div>
  );
}

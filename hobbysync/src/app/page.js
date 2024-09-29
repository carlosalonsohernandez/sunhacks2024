"use client";
import { useState } from 'react';
import Footer from './components/Footer.js';
import Calendar from './components/Calendar.js'; 
import TaskPopup from './components/TaskPopUp.js'; 
import Register from './components/Register.js'; 
import Login from './components/Login.js'; // Import the new Login component

export default function Home() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [taskToEditIndex, setTaskToEditIndex] = useState(null); // Track which task is being edited
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this to track login status

  const handleYearChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 2025) value = 2024;
    if (value < 2000) value = 2000;
    setYear(value);
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Handle login
  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Save user in localStorage
    setIsLoggedIn(true); // Update login state
    setIsLoginOpen(false); // Close login modal
  };

  // Handle register
  const handleRegister = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Save user in localStorage
    setIsLoggedIn(true);
    setIsRegisterOpen(false); // Close register modal
  };

  // Handle logging out
  const handleLogoutOrSignIn = () => {
    if (isLoggedIn) {
      localStorage.removeItem('user'); // Clear localStorage on logout
      setIsLoggedIn(false); 
    } else {
      setIsLoginOpen(true); 
    }
  };

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

  // Helper function to calculate recurring dates based on frequency
  const getRecurringDates = (task) => {
    const { startDate, endDate, repeatFrequency } = task;
    const recurringDates = [];

    let currentDate = new Date(startDate);
    const lastDate = endDate ? new Date(endDate) : new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate()); // Default to one year if no end date

    while (currentDate <= lastDate) {
      recurringDates.push(new Date(currentDate)); // Store the current date

      // Increment based on the repeat frequency
      if (repeatFrequency === 'Daily') {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (repeatFrequency === 'Weekly') {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (repeatFrequency === 'Monthly') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        break; // No repeat if the frequency is "None"
      }
    }

    return recurringDates;
  };

  // Save a new task or update an existing one
  const handleSaveTask = (taskData) => {
    const updatedTasks = [...tasks];

    // If we're editing a task, update it
    if (taskToEditIndex !== null) {
      updatedTasks[taskToEditIndex] = taskData;
    } else {
      // If it's a new task, calculate its recurring dates and save
      const recurringDates = getRecurringDates(taskData);
      updatedTasks.push({
        ...taskData,
        recurringDates, // Store the list of dates the task should appear on
      });
    }

    setTasks(updatedTasks);
    setIsPopupOpen(false); // Close the popup after saving
  };

  // Open the popup to edit a task
  const handleEditTask = (index) => {
    setTaskToEditIndex(index);
    setIsPopupOpen(true); // Open the popup for editing
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="header">
        {/* Your header code */}
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 pb-4">
          <button onClick={openPopup} className="px-4 py-2 bg-green-500 text-white rounded absolute right-4">
            Add Task
          </button>

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

          {/* Render Calendar component with tasks */}
          <Calendar year={year} month={month} tasks={tasks} onEditTask={handleEditTask} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

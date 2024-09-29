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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
    const recurringDates = getRecurringDates(taskData);
    if (taskToEditIndex !== null) {
      updatedTasks[taskToEditIndex] = { ...taskData, recurringDates };
    } else {
      updatedTasks.push({ ...taskData, recurringDates });
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
        <div className="left-section">
          <a href="https://imgbb.com/">
            <img 
              src="https://i.ibb.co/X5849y8/hbslogo.png" 
              alt="Hobbies Sync Logo" 
              className="logo" 
              style={{ height: '40px', width: 'auto' }} // Adjust size as needed
            />
          </a>
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
          </div>
        </div>
        <div className="dropdown profile-dropdown">
          <button className="dropbtnp">
            <img src="https://via.placeholder.com/40" alt="Profile Icon" className="profile-icon" />
          </button>
          <div className="dropdown-contentp">
            <a href="#profile">Profile</a>
            <a href="#settings">Settings</a>
            <a href="#login-logout" onClick={handleLogoutOrSignIn}>
              {isLoggedIn ? 'Logout' : 'Sign In'}
            </a>
            {!isLoggedIn && (
              <a href="#register" onClick={() => setIsRegisterOpen(true)}>Register</a>
            )}
          </div>
        </div>
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

      {/* Login Modal */}
      {isLoginOpen && (
        <Login
          onClose={() => setIsLoginOpen(false)} // Close the login modal
          onLogin={handleLogin} // Handle successful login
        />
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <Register
          onClose={() => setIsRegisterOpen(false)}
          onRegister={handleRegister}
        />
      )}

    </div>
  );
}

"use client";
import Footer from './components/Footer.js';
<<<<<<< Updated upstream
import Calendar from './components/Calendar.js'; // Ensure this is correctly imported
import { useState } from 'react';
import TaskPopup from './components/TaskPopUp.js'; // Ensure the correct import
=======
import Calendar from './components/Calendar.js'; 
import TaskPopup from './components/TaskPopUp.js'; 
import Register from './components/Register.js'; 
import Login from './components/Login.js'; // Import the new Login component
import HobbyPopup from './components/HobbyPopUp.js'; // Import HobbyPopup component
>>>>>>> Stashed changes

export default function Home() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskToEditIndex, setTaskToEditIndex] = useState(null); // Track which task is being edited
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this to track login status

  // Hobby state
  const [isHobbyPopupOpen, setIsHobbyPopupOpen] = useState(false); // Track hobby popup visibility
  const [hobbies, setHobbies] = useState([]); // Store list of hobbies

  // Define handleProfileClick
  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

<<<<<<< Updated upstream
  // Define handleLogoutOrSignIn
  const handleLogoutOrSignIn = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false); // Log out the user
    } else {
      // Redirect to login or open login modal
      console.log("Sign In");
    }
  };

  // Handle Year Change
  const handleYearChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 2025) value = 2024;
    if (value < 2000) value = 2000;
    setYear(value);
  };

  // Handle Month Change
=======
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

  // Handle Year Change
  const handleYearChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 2025) value = 2024;
    if (value < 2000) value = 2000;
    setYear(value);
  }

>>>>>>> Stashed changes
  const handleMonthChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 12) value = 12;
    if (value < 1) value = 1;
    setMonth(value - 1);
  };

  // Open the popup for a new task
  const openTaskPopup = () => {
    setTaskToEditIndex(null); // New task
    setIsTaskPopupOpen(true);
  };

  // Close the task popup
  const closeTaskPopup = () => {
    setIsTaskPopupOpen(false);
  };

  // Save a new task or update an existing one
  const handleSaveTask = (taskData) => {
    if (taskToEditIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === taskToEditIndex ? taskData : task
      );
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, taskData]);
    }
    setIsTaskPopupOpen(false); // Close the popup after saving
  };

  // Open the popup to edit a task
  const handleEditTask = (index) => {
    setTaskToEditIndex(index);
    setIsTaskPopupOpen(true); // Open the popup for editing
  };

  // Helper function to truncate the task name
  const truncateTaskName = (name) => {
    return name.length > 6 ? `${name.substring(0, 6)}...` : name;
<<<<<<< Updated upstream
=======
  };

  // Open the hobby popup
  const openHobbyPopup = () => {
    setIsHobbyPopupOpen(true);
  };

  // Close the hobby popup
  const closeHobbyPopup = () => {
    setIsHobbyPopupOpen(false);
  };

  // Save a new hobby
  const handleSaveHobby = (newHobby) => {
    setHobbies([...hobbies, newHobby]);
    setIsHobbyPopupOpen(false); // Close the hobby popup after saving
>>>>>>> Stashed changes
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
              style={{ height: '40px', width: 'auto' }} 
            />
          </a>
          <div className="menu-section">
            {/* Menu Dropdowns */}
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
            <a href="#profile" onClick={handleProfileClick}>Profile</a>
            <a href="#settings">Settings</a>
            <a href="#login-logout" onClick={handleLogoutOrSignIn}>
              {isLoggedIn ? 'Logout' : 'Sign In'}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 pb-4">
<<<<<<< Updated upstream

          <button onClick={openPopup} className="px-4 py-2 bg-green-500 text-white rounded absolute right-4">
=======
          <button onClick={openTaskPopup} className="px-4 py-2 bg-green-500 text-white rounded absolute right-4">
>>>>>>> Stashed changes
            Add Task
          </button>

          {/* Add Hobby Button */}
          <button onClick={openHobbyPopup} className="px-4 py-2 bg-blue-500 text-white rounded absolute right-28">
            Add Hobby
          </button>

          {/* Task Popup */}
          {isTaskPopupOpen && (
            <TaskPopup
              onClose={closeTaskPopup}
              onSave={handleSaveTask}
              taskData={taskToEditIndex !== null ? tasks[taskToEditIndex] : {}}
            />
          )}

<<<<<<< Updated upstream
=======
          {/* Hobby Popup */}
          {isHobbyPopupOpen && (
            <HobbyPopup onClose={closeHobbyPopup} onSave={handleSaveHobby} />
          )}

>>>>>>> Stashed changes
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

          {/* Render Calendar component with tasks */}
          <Calendar year={year} month={month} tasks={tasks} onEditTask={handleEditTask} />
<<<<<<< Updated upstream
=======

          {/* List of hobbies */}
          <ul className="mt-4">
            {hobbies.map((hobby, index) => (
              <li key={index} className="py-1">
                {hobby.hobbyName} (Difficulty: {hobby.difficulty}) - {hobby.description}
              </li>
            ))}
          </ul>
>>>>>>> Stashed changes
        </div>
      </main>

      <Footer />
<<<<<<< Updated upstream
=======

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
>>>>>>> Stashed changes
    </div>
  );
}

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
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
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
        <div className="container mx-auto p-4">
          <button onClick={openPopup} className="px-4 py-2 bg-green-500 text-white rounded">
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
                <p>Dates: {task.startDate} to {task.endDate}</p>
              </div>
            ))}
          </div>

          {/* Task Popup */}
          {isPopupOpen && (
            <TaskPopup onClose={closePopup} onSave={handleSaveTask} />
          )}

          {/* Render Calendar component */}
          <Calendar year={year} month={month} />
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

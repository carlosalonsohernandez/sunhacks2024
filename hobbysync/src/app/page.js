"use client";
import { useState } from 'react';
import Footer from './components/Footer.js';
import Calendar from './components/Calendar.js'; 
import TaskPopup from './components/TaskPopUp.js'; 
import Register from './components/Register.js'; // Import the Register component

export default function Home() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); 
  const [loginError, setLoginError] = useState(null); 
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // Handle localStorage when logging in
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('user', JSON.stringify(result)); // Save user in localStorage
        setIsLoggedIn(true); 
        setIsLoginOpen(false);
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('Login error. Please try again.');
    }
  };

  // Handle localStorage when registering
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

  // Handle login form changes
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
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
        <div className="login-modal">
          <div className="modal-content">
            <h2>Login</h2>
            {loginError && <p className="error-message">{loginError}</p>}
            <form onSubmit={handleLogin}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit">Login</button>
              <button type="button" onClick={() => setIsLoginOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <Register
          onClose={() => setIsRegisterOpen(false)}
          onRegister={handleRegister}
        />
      )}

      {/* Modal CSS */}
      <style jsx>{`
        .login-modal, .register-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        }
        .modal-content form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .modal-content button {
          margin-top: 10px;
        }
        .error-message {
          color: red;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

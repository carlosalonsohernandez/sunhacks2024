"use client";
import { useState } from 'react';
import Footer from './components/Footer.js';
import Calendar from './components/Calendar.js'; 
import TaskPopup from './components/TaskPopUp.js'; 
import Register from './components/Register.js'; 
import Login from './components/Login.js'; // Import the new Login component
import { stringify } from 'postcss';

export default function Home() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Track login modal visibility
  const [loginError, setLoginError] = useState(null); // Track login errors
  const [loginData, setLoginData] = useState({ email: '', password: '' }); // Login form data
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [taskToEditIndex, setTaskToEditIndex] = useState(null); // Track which task is being edited

  // Handle Year Change
  const handleYearChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 2025) value = 2024;
    if (value < 2000) value = 2000;
    setYear(value);
  }

  const [currentUser, setCurrentUser] = useState(null); // State to store current user

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      setIsLoginOpen(true); // Open login modal when not logged in
    } else {
      // Handle profile-related actions for logged-in users
    }
  };
  const closeLogin = () => {
    setIsLoginOpen(false); // Close login modal
  };
  const handleLogoutOrSignIn = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false); // Log out action
    } else {
      setIsLoginOpen(true); // Open login modal
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null); // Clear previous errors
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
        setIsLoggedIn(true); // Successfully logged in
        setIsLoginOpen(false); // Close login modal
        console.log('Login successful:', result);
        user = {
          "userId" : result.userId,
          "email" : login.email,
          "password" : login.password,
          "username" : result.username,
          "age" : result.age
        }
        setCurrentUser(user);
        console.log('hello');
        console.log(JSON.stringify(user));
        localStorage.setItem('user', JSON.stringify(user)); // Save user in localStorage
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || 'Login failed'); // Set error message
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login error. Please try again.'); // Handle network errors
    }
  };

  // Handle register
  const handleRegister = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Save user in localStorage
    setIsLoggedIn(true);
    setIsRegisterOpen(false); // Close register modal
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

  // Save a new task or update an existing one
  const handleSaveTask = async (taskData) => {

    if (taskToEditIndex !== null) {
      // Update the existing task
      const updatedTasks = tasks.map((task, index) =>
        index === taskToEditIndex ? taskData : task
      );
      setTasks(updatedTasks);
    } else {
      // Save a new task
      setTasks([...tasks, taskData]);
      try {
        const response = await fetch('http://localhost:8000/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Login successful:', result);
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
        console.error('Login error:', error);
      }
      console.log(taskData);
    }
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

        </div>
      </main>

      <Footer />


 {/* Conditional rendering of the login modal */}
 {isLoginOpen && (
        <div className="login-modal">
          <div className="modal-content">
            <h2>Login</h2>
            {loginError && <p className="error-message">{loginError}</p>} {/* Display login errors */}
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
              <button type="button" onClick={closeLogin}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      {/* Simple CSS to style the modal */}
      <style jsx>{`
        .login-modal {
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

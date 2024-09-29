"use client";
import { useState, useEffect } from 'react';
import Footer from './components/Footer.js';
import Calendar from './components/Calendar.js';
import TaskPopup from './components/TaskPopUp.js';
import Register from './components/Register.js';
import HobbyPopup from './components/HobbyPopUp.js';
import Login from './components/Login.js';
import NotificationComponent from './components/Notification.js'; // Import NotificationComponent
import axios from "axios";

export default function Home() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskToEditIndex, setTaskToEditIndex] = useState(null);
  const [hobbies, setHobbies] = useState([]);
  const [isHobbyPopupOpen, setIsHobbyPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // State to store current user

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(null); // Track login errors
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // Request notification permissions when the component mounts
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Function to request notification permissions
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notifications");
      return;
    }

    if (Notification.permission === "granted") {
      console.log("Notification permission already granted");
    } else if (Notification.permission !== "denied") {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    }
  };

  // Check for tasks within 1 day and trigger notifications
  const notifyUpcomingTasks = () => {
    const now = new Date();
    const oneDayFromNow = new Date(now);
    oneDayFromNow.setDate(now.getDate() + 1);

    const upcomingTasks = tasks.filter(task => {
      const taskDate = new Date(task.startDate);
      return taskDate >= now && taskDate <= oneDayFromNow;
    });

    upcomingTasks.forEach(task => {
      try {
        new Notification("Upcoming Task", {
          body: `${task.taskName} is due tomorrow!`,
          icon: "/path/to/icon.png" // Optional: You can add an icon here
        });
        console.log(`Notification triggered for task: ${task.taskName}`);
      } catch (error) {
        console.error("Notification failed to trigger:", error);
      }
    });
  };

  // Handle login
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
        setCurrentUser({
          userId: result.userId,
          email: loginData.email,
          password: loginData.password,
          username: result.username,
          age: result.age,
        });
        localStorage.setItem('user', JSON.stringify(currentUser)); // Save user in localStorage
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login error. Please try again.');
    }
  };

  // Handle register
  const handleRegister = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8000/register', userData);
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        setIsRegisterOpen(false);
      } else {
        console.error('Register failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  // Handle logging out
  const handleLogoutOrSignIn = () => {
    if (isLoggedIn) {
      localStorage.removeItem('user');
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
  };

  // Handle Month Change
  const handleMonthChange = (e) => {
    let value = parseInt(e.target.value);
    if (value > 12) value = 12;
    if (value < 1) value = 1;
    setMonth(value - 1);
  };

  // Open the popup for a new task
  const openTaskPopup = () => {
    setTaskToEditIndex(null);
    setIsTaskPopupOpen(true);
  };

  // Close the task popup
  const closeTaskPopup = () => {
    setIsTaskPopupOpen(false);
  };

  // Save a new task or update an existing one
  const handleSaveTask = (taskData) => {
    const updatedTasks = [...tasks];
    const recurringDates = getRecurringDates(taskData);

    if (taskToEditIndex !== null) {
      // Update the existing task
      updatedTasks[taskToEditIndex] = { ...taskData, recurringDates };
      setTasks(updatedTasks);
    } else {
      const saveTask = async () => {
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
            const taskWithId = { ...taskData, _id: result._id || result.taskId };
            setTasks([...tasks, taskWithId]);
            console.log('Task saved successfully:', taskWithId);
          } else {
            console.error('Failed to save task');
          }
        } catch (error) {
          console.error('Error saving task:', error);
        }
      };
      saveTask();
    }
    setIsTaskPopupOpen(false);
    notifyUpcomingTasks(); // Check for tasks due within the next day
  };

  // Open the popup to edit a task
  const handleEditTask = (index) => {
    setTaskToEditIndex(index);
    setIsTaskPopupOpen(true);
  };

  // Open the hobby popup
  const openHobbyPopup = () => setIsHobbyPopupOpen(true);

  // Close the hobby popup
  const closeHobbyPopup = () => setIsHobbyPopupOpen(false);

  // Save hobby logic
  const handleSaveHobby = (newHobby) => {
    setHobbies([...hobbies, newHobby]);
    setIsHobbyPopupOpen(false);

    if (!currentUser || !currentUser.userId) {
      console.error('User is not logged in. Cannot associate hobby.');
      return;
    }

    const hobbyWithUser = { ...newHobby, userId: currentUser.userId };

    const saveHobby = async () => {
      try {
        const response = await fetch('http://localhost:8000/hobbies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hobbyWithUser),
        });
        if (response.ok) {
          console.log('Hobby saved successfully');
        } else {
          console.error('Error saving hobby');
        }
      } catch (error) {
        console.error('Save hobby error:', error);
      }
    };
    saveHobby();
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
            {!isLoggedIn && (
              <a href="#register" onClick={() => setIsRegisterOpen(true)}>Register</a>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <button onClick={openTaskPopup} className="px-4 py-2 bg-green-500 text-white rounded absolute right-5">
            Add Task
          </button>

          <button onClick={openHobbyPopup} className="px-4 py-2 bg-blue-500 text-white rounded absolute right-40">
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

          {/* Hobby Popup */}
          {isHobbyPopupOpen && (
            <HobbyPopup onClose={closeHobbyPopup} onSave={handleSaveHobby} />
          )}

          {/* Render Calendar component with tasks */}
          <Calendar year={year} month={month} tasks={tasks} onEditTask={handleEditTask} />

          {/* Notification Component */}
          <NotificationComponent tasks={tasks} />

          {/* List of hobbies */}
          <ul className="mt-4">
            {hobbies.map((hobby, index) => (
              <li key={index} className="py-1">
                {hobby.hobbyName} (Difficulty: {hobby.difficulty}) - {hobby.description}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />

      {/* Login Modal */}
      {isLoginOpen && (
        <Login
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
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

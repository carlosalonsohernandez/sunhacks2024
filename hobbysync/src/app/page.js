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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hobby state
  const [isHobbyPopupOpen, setIsHobbyPopupOpen] = useState(false);
  const [hobbies, setHobbies] = useState([]);

  // Request notification permissions when the component mounts
  useEffect(() => {
     requestNotificationPermission();
   }, []);

  // Handle Profile Click
  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
  const handleLogin = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8000/login', userData);
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        setIsLoginOpen(false);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
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

  // Helper function to calculate recurring dates based on frequency
  const getRecurringDates = (task) => {
    const { startDate, endDate, repeatFrequency } = task;
    const recurringDates = [];
    let currentDate = new Date(startDate);
    const lastDate = endDate ? new Date(endDate) : new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());

    while (currentDate <= lastDate) {
      recurringDates.push(new Date(currentDate));
      if (repeatFrequency === 'Daily') {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (repeatFrequency === 'Weekly') {
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (repeatFrequency === 'Monthly') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        break;
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
    setIsTaskPopupOpen(false);
    notifyUpcomingTasks(); // Check for tasks due within the next day
  };

  // Open the popup to edit a task
  const handleEditTask = (index) => {
    setTaskToEditIndex(index);
    setIsTaskPopupOpen(true);
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
    setIsHobbyPopupOpen(false);
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

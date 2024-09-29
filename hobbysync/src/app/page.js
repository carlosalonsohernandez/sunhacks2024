"use client";
import Footer from './components/Footer.js';
import Calendar from './components/Calendar.js';
import { useState } from 'react';

export default function Home() {
  // State to manage the input values for year and month
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth()); // 0-based index (0 = January, ..., 11 = December)

  // List of years (from 2000 to 2030)
  const years = Array.from({ length: 31 }, (_, i) => i + 2000);

  // List of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Handlers for updating the state
  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value));
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

        {/* User Inputs for Month and Year */}
        <div className="container mx-auto p-4">
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
                {years.map((yr) => (
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
                {monthNames.map((monthName, index) => (
                  <option key={index} value={index}>
                    {monthName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Calendar for a specific month */}
        <div className="container mx-auto p-4">
          <Calendar year={year} month={month} />
        </div>
      </main>

      {/* Properly rendered Footer component */}
      <Footer />
    </div>
  );
}

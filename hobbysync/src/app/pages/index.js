"use client";
import Footer from '../components/Footer.js';
import InteractiveBlock from '../components/SingleCalendar.js';
import Calendar from '../components/Calendar.js';

export default function Home() {
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
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-4">Interactive Block Component</h1>
          <InteractiveBlock />
        </div>

        {/* Calendar for a specific month */}
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Calendar Component</h2>
          <Calendar year={2024} month={7} /> {/* September 2023 (month is 0-based) */}
        </div>
      </main>

      {/* Properly rendered Footer component */}
      <Footer />
    </div>
  );
}

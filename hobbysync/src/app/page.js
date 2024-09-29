"use client";
import Footer from './components/Footer.js';
import InteractiveBlock from './components/SingleCalendar.js';

export default function Home() {
  return (

    <div>
      <header className="header">
        <div className="left-section">
          <div className="title">Habit Sync</div>

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

    <div className ="container w-full">
    <main>
      <p>Hello World</p>
      <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Interactive Block Component</h1>
      <InteractiveBlock />
    </div>

    </main>
   <footer className="container w-full p-4">
      {/* Other page content */}
      <footer />
    </footer>
    </div>
  );
}

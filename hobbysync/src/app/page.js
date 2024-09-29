import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header className="header">
        <div className="title">Habit Sync</div>
        <div className="dropdown profile-dropdown">
          <button className="dropbtnp">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile Icon"
              className="profile-icon"
            />
          </button>
          <div className="dropdown-content">
            <a href="#profile">Profile</a>
            <a href="#settings">Settings</a>
            <a href="#logout">Logout</a>
          </div>
        </div>
      </header>

      <main>
        {/* New section below the header containing menu buttons */}
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

        </div>
      </main>
    </div>
  );
}

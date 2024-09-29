"use client";
import { useState, useEffect, useRef } from 'react';

export default function Login({ onClose, onLogin }) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(null);
  const modalRef = useRef();

  // Handle form changes
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle form submission
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
        onLogin(result); // Pass result to parent component
        onClose(); // Close the login modal
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('Login error. Please try again.');
    }
  };

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="login-modal">
      <div className="modal-content" ref={modalRef}>
        <h2>Login</h2>
        {loginError && <p className="error-message">{loginError}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
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
          <div className="form-group">
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
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
        </form>
      </div>

      {/* Modal CSS */}
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
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.3s ease-in-out;
        }
        .modal-content h2 {
          margin-bottom: 20px;
          font-size: 24px;
        }
        .modal-content .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
        }
        .modal-content label {
          margin-bottom: 8px;
          font-weight: 500;
          font-size: 14px;
        }
        .modal-content input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        .modal-content .login-button, .modal-content .cancel-button {
          padding: 10px;
          font-size: 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .modal-content .login-button {
          background-color: #28a745;
          color: white;
          margin-right: 10px;
        }
        .modal-content .cancel-button {
          background-color: #dc3545;
          color: white;
        }
        .error-message {
          color: red;
          font-weight: bold;
          margin-bottom: 10px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

import { useState } from 'react';

export default function Register({ onClose, onRegister }) {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    location: {
      city: '',
      country: '',
    },
    hobbyPreferences: [], // Initialize as an array
    availability: {
      daysOfWeek: [] // Days of the week array
    }
  });

  const [currentStep, setCurrentStep] = useState(0); // Track the current step
  const [registerError, setRegisterError] = useState(null);

  // Handle input changes for text, email, etc.
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('location.')) {
      const [_, field] = name.split('.');
      setRegisterData({
        ...registerData,
        location: { ...registerData.location, [field]: value },
      });
    } else {
      setRegisterData({ ...registerData, [name]: value });
    }
  };

  // Handle hobby preferences input (convert comma-separated string to array)
  const handleHobbyPreferencesChange = (e) => {
    const { value } = e.target;
    setRegisterData({
      ...registerData,
      hobbyPreferences: value.split(',').map(hobby => hobby.trim()) // Convert to array
    });
  };

  // Handle day selection for daysOfWeek array
  const handleDaySelection = (e) => {
    const { value, checked } = e.target;
    let updatedDays = [...registerData.availability.daysOfWeek];
    if (checked) {
      updatedDays.push(value);
    } else {
      updatedDays = updatedDays.filter(day => day !== value);
    }
    setRegisterData({
      ...registerData,
      availability: {
        ...registerData.availability,
        daysOfWeek: updatedDays
      }
    });
  };

  // Handle form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError(null); // Clear previous errors

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData), // Send the updated data
      });

      if (response.ok) {
        const result = await response.json();
        onRegister(result); // Pass the result back to parent to set localStorage
        onClose(); // Close the modal
      } else {
        const errorData = await response.json();
        setRegisterError(errorData.message || 'Registration failed');
      }
    } catch (error) {
      setRegisterError('Registration error. Please try again.');
    }
  };

  // Function to go to the next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to go to the previous step
  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Define the fields for each step (showing 2 fields at a time)
  const steps = [
    [
      { label: 'Username', name: 'username', type: 'text', value: registerData.username, placeholder: 'Enter your username' },
      { label: 'Email', name: 'email', type: 'email', value: registerData.email, placeholder: 'Enter your email' }
    ],
    [
      { label: 'Password', name: 'password', type: 'password', value: registerData.password, placeholder: 'Enter your password' },
      { label: 'Age', name: 'age', type: 'number', value: registerData.age, placeholder: 'Enter your age' }
    ],
    [
      { label: 'City', name: 'location.city', type: 'text', value: registerData.location.city, placeholder: 'Enter your city' },
      { label: 'Country', name: 'location.country', type: 'text', value: registerData.location.country, placeholder: 'Enter your country' }
    ],
    [
      { label: 'Hobby Preferences', name: 'hobbyPreferences', type: 'text', value: registerData.hobbyPreferences.join(', '), placeholder: 'Separate by comma', onChange: handleHobbyPreferencesChange }
    ],
    [
      // Step with checkboxes for selecting days of the week
      { label: 'Days of the Week', type: 'checkbox-group' }
    ]
  ];

  return (
    <div className="register-modal">
      <div className="modal-content">
        <h2>Register</h2>
        {registerError && <p className="error-message">{registerError}</p>}
        <form onSubmit={handleRegisterSubmit}>
          {/* Render the fields for the current step */}
          {steps[currentStep].map((field, index) => (
            field.type === 'checkbox-group' ? (
              <div key={index} className="checkbox-group">
                <label>{field.label}:</label>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Monday"
                      checked={registerData.availability.daysOfWeek.includes('Monday')}
                      onChange={handleDaySelection}
                    />
                    Monday
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Tuesday"
                      checked={registerData.availability.daysOfWeek.includes('Tuesday')}
                      onChange={handleDaySelection}
                    />
                    Tuesday
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Wednesday"
                      checked={registerData.availability.daysOfWeek.includes('Wednesday')}
                      onChange={handleDaySelection}
                    />
                    Wednesday
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Thursday"
                      checked={registerData.availability.daysOfWeek.includes('Thursday')}
                      onChange={handleDaySelection}
                    />
                    Thursday
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Friday"
                      checked={registerData.availability.daysOfWeek.includes('Friday')}
                      onChange={handleDaySelection}
                    />
                    Friday
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Saturday"
                      checked={registerData.availability.daysOfWeek.includes('Saturday')}
                      onChange={handleDaySelection}
                    />
                    Saturday
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Sunday"
                      checked={registerData.availability.daysOfWeek.includes('Sunday')}
                      onChange={handleDaySelection}
                    />
                    Sunday
                  </label>
                </div>
              </div>
            ) : (
              <div key={index}>
                <label>{field.label}:</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange ? field.onChange : handleRegisterChange}
                  placeholder={field.placeholder}
                  required
                />
              </div>
            )
          ))}

          {/* Navigation buttons */}
          <div className="navigation-buttons">
            {currentStep > 0 && (
              <button type="button" onClick={previousStep} className="prev-button">
                <span className="arrow">←</span>
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button type="button" onClick={nextStep} className="next-button">
                <span className="arrow">→</span>
              </button>
            )}
            {currentStep === steps.length - 1 && (
              <button type="submit" className="submit-button">Submit</button>
            )}
          </div>

          <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
        </form>
      </div>

      <style jsx>{`
        .register-modal {
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
        }
        .checkbox-group label {
          display: inline-block;
          margin-right: 10px;
        }
        .navigation-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        .arrow {
          font-size: 24px;
          cursor: pointer;
          color: #336394;
        }
        .error-message {
          color: red;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect } from 'react';

const TaskPopup = ({ onClose, onSave, taskData = {} }) => {
  const [taskName, setTaskName] = useState(taskData.taskName || '');
  const [startDate, setStartDate] = useState(taskData.startDate || '');
  const [endDate, setEndDate] = useState(taskData.endDate || '');
  const [time, setTime] = useState(taskData.time || '');
  const [color, setColor] = useState(taskData.color || '#FF0000'); // Default color (Red)
  const [notes, setNotes] = useState(taskData.notes || '');
  const [repeatFrequency, setRepeatFrequency] = useState(taskData.repeatFrequency || 'None');
  const [isVisible, setIsVisible] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false); // Controls color dropdown visibility

  const colors = [
    { value: '#FF0000', name: 'Red' },
    { value: '#00FF00', name: 'Green' },
    { value: '#0000FF', name: 'Blue' },
    { value: '#FFFF00', name: 'Yellow' },
    { value: '#FF00FF', name: 'Magenta' },
    { value: '#00FFFF', name: 'Cyan' },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSave = () => {
    const task = {
      taskName,
      startDate,
      endDate,
      time,
      color,
      notes,
      repeatFrequency,
    };
    onSave(task);
    onClose();
  };

  // Toggle the color dropdown
  const toggleColorDropdown = () => {
    setIsColorDropdownOpen((prevState) => !prevState);
  };

  // Handle color selection and close the dropdown
  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor); // Set the selected color
    setIsColorDropdownOpen(false); // Close the dropdown after color selection
  };

  // Close dropdown if clicked outside
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.dropdown')) {
      setIsColorDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isColorDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isColorDropdownOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`bg-white w-[700px] h-[550px] p-6 rounded-lg shadow-lg transform transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-75'}`}
      >
        <h2 className="text-2xl font-bold mb-4">{taskData.taskName ? 'Edit Task' : 'Add New Task'}</h2>

        {/* Task Name, Start Date, and End Date in a Single Line */}
        <div className="flex space-x-4 mb-4">
          <label className="flex-1">
            Task Name:
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="w-1/4">
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="w-1/4">
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
        </div>

        {/* Time, Color, and Repetition in a Single Line */}
        <div className="flex space-x-4 mb-4">
          <label className="flex-1">
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>

          {/* Custom Color Dropdown */}
          <label className="w-1/4 relative dropdown">
            Color:
            <button
              className="w-full mt-1 p-2 border border-gray-300 rounded flex items-center justify-between"
              onClick={toggleColorDropdown}
            >
              <span>{colors.find((c) => c.value === color)?.name}</span>
              <span
                className="inline-block w-4 h-4 rounded-full ml-2"
                style={{ backgroundColor: color }}
              ></span>
            </button>
            {isColorDropdownOpen && (
              <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {colors.map((colorOption) => (
                  <li
                    key={colorOption.value}
                    className="p-2 hover:bg-gray-100 flex items-center justify-between cursor-pointer"
                    onClick={() => handleColorSelect(colorOption.value)}
                  >
                    <span>{colorOption.name}</span>
                    <span
                      className="inline-block w-4 h-4 rounded-full ml-2"
                      style={{ backgroundColor: colorOption.value }}
                    ></span>
                  </li>
                ))}
              </ul>
            )}
          </label>

          <label className="w-1/3">
            Repetition:
            <select
              value={repeatFrequency}
              onChange={(e) => setRepeatFrequency(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="None">None</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </label>
        </div>

        {/* Notes Input */}
        <label className="block mb-4">
          Notes:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded h-40 resize-none"
          />
        </label>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPopup;

// components/TaskPopup.js
import { useState, useEffect } from 'react';

const TaskPopup = ({ onClose, onSave }) => {
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [time, setTime] = useState('');
  const [color, setColor] = useState('#FF0000'); // Default color (Red)
  const [notes, setNotes] = useState('');
  const [repeatFrequency, setRepeatFrequency] = useState('None');

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSave = () => {
    const taskData = {
      taskName,
      startDate,
      endDate,
      time,
      color,
      notes,
      repeatFrequency,
    };
    onSave(taskData);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`bg-white w-[700px] h-[550px] p-6 rounded-lg shadow-lg transform transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-75'}`}
      >
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

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

          {/* Color Dropdown with Limited Colors */}
          <label className="w-1/4">
            Color:
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="#FF0000" style={{ color: '#FF0000' }}>Red</option>
              <option value="#00FF00" style={{ color: '#00FF00' }}>Green</option>
              <option value="#0000FF" style={{ color: '#0000FF' }}>Blue</option>
              <option value="#FFFF00" style={{ color: '#FFFF00' }}>Yellow</option>
              <option value="#FF00FF" style={{ color: '#FF00FF' }}>Magenta</option>
              <option value="#00FFFF" style={{ color: '#00FFFF' }}>Cyan</option>
            </select>
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
            className="w-full mt-1 p-2 border border-gray-300 rounded h-40 resize-none" // Add resize-none class here
          />
        </label>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-600"
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

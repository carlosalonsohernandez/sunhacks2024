import { useState, useEffect } from 'react';

const HobbyPopup = ({ onClose, onSave, hobbyData = {} }) => {
  const [hobbyName, setHobbyName] = useState(hobbyData.hobbyName || '');
  const [difficulty, setDifficulty] = useState(hobbyData.difficulty || '1'); // Default difficulty is 1
  const [description, setDescription] = useState(hobbyData.description || '');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSave = () => {
    // Validation check: Ensure the hobby name is filled
    if (!hobbyName) {
      alert('Please provide a hobby name.');
      return;
    }

    // Create the hobby object
    const hobby = {
      hobbyName,
      difficulty,
      description,
    };

    // Pass the new hobby data to the onSave function
    onSave(hobby);
    onClose(); // Close the popup after saving
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`bg-white w-[500px] h-[500px] p-6 rounded-lg shadow-lg transform transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-75'}`}
      >
        <h2 className="text-2xl font-bold mb-4">{hobbyData.hobbyName ? 'Edit Hobby' : 'Add New Hobby'}</h2>

        {/* Hobby Name */}
        <div className="mb-4">
          <label className="block">
            Hobby Name:
            <input
              type="text"
              value={hobbyName}
              onChange={(e) => setHobbyName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
        </div>

        {/* Difficulty Level Dropdown */}
        <div className="mb-4">
          <label className="block">
            Difficulty Level (1-5):
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block">
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded h-24 resize-none"
            />
          </label>
        </div>

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
            Save Hobby
          </button>
        </div>
      </div>
    </div>
  );
};

export default HobbyPopup;

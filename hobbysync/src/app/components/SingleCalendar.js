// components/InteractiveBlock.js
"use client"; // Ensure it's a Client Component for using useState

import { useState } from 'react';

const InteractiveBlock = () => {
  const [tags, setTags] = useState([]); // State to hold the list of tags
  const [inputText, setInputText] = useState(''); // State for current input

  // Handle input changes
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle the key press event for adding tags
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputText.trim()) {
      setTags([...tags, inputText.trim()]); // Add the new tag to the list
      setInputText(''); // Clear the input
    }
  };

  // Remove a tag
  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-80 p-4 bg-blue-100 border border-blue-300 rounded-lg">
      {/* Display the list of tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center space-x-2"
          >
            <span>{tag}</span>
            <button
              className="ml-1 text-white hover:text-red-400"
              onClick={() => removeTag(index)}
            >
              &times; {/* Close button to remove tag */}
            </button>
          </div>
        ))}
      </div>
      {/* Input area for adding new tags */}
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Type something and press Enter..."
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InteractiveBlock;
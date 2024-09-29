"use client";
import { useEffect, useState } from 'react';

const NotificationComponent = ({ tasks }) => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [visible, setVisible] = useState(true); // Track visibility for closing

  useEffect(() => {
    const checkUpcomingTasks = () => {
      const now = new Date();
      const oneDayFromNow = new Date(now);
      oneDayFromNow.setDate(now.getDate() + 1);

      const upcoming = tasks.filter((task) => {
        const taskDate = new Date(task.startDate);
        return taskDate >= now && taskDate <= oneDayFromNow;
      });

      setUpcomingTasks(upcoming);
    };

    checkUpcomingTasks();
  }, [tasks]);

  // Manually close the notification
  const handleClose = () => {
    setVisible(false);
  };

  if (upcomingTasks.length === 0 || !visible) {
    return null; // Don't show if no tasks or manually closed
  }

  return (
    <div className="fixed bottom-5 right-5 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Upcoming Task</h3>
        <button onClick={handleClose} className="ml-2 text-white font-bold">
          &times;
        </button>
      </div>
      <p>You have tasks due within the next day:</p>
      <ul className="list-disc pl-5">
        {upcomingTasks.map((task, index) => (
          <li key={index}>
            <span>{task.taskName}</span> on {new Date(task.startDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;

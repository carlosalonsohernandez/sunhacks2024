import { useEffect, useState } from 'react';

const NotificationComponent = ({ tasks }) => {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

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

      // Show browser notifications
      upcoming.forEach(showNotification);
    };

    checkUpcomingTasks();
  }, [tasks]);

  const showNotification = (task) => {
    if (Notification.permission === "granted") {
      new Notification(`Upcoming Task: ${task.taskName}`, {
        body: `Task is due on ${new Date(task.startDate).toLocaleDateString()}`,
      });
    }
  };

  // Hide notification when "X" button is clicked
  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible || upcomingTasks.length === 0) {
    return null; // Don't show the notification if there are no tasks or it's closed
  }

  return (
    <div className="fixed bottom-5 right-5 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Upcoming Task</h3>
        <button onClick={handleClose} className="text-white font-bold text-lg">
          &times; {/* Close button */}
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

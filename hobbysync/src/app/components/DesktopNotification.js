import { useEffect } from 'react';

const NotificationComponent = () => {
  // Function to trigger a desktop notification
  const triggerNotification = (title, options) => {
    if (Notification.permission === "granted") {
      const notification = new Notification(title, options);

      notification.onclick = () => {
        window.focus(); // Bring the tab into focus when the notification is clicked
      };
    }
  };

  // Function to fetch tasks and notify
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://your-backend-api.com/upcoming-tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const tasks = await response.json();

      tasks.forEach(task => {
        triggerNotification('Upcoming Task', {
          body: `Task "${task.name}" is due on ${new Date(task.dueDate).toLocaleDateString()}`,
          icon: '/path/to/icon.png', // Optional icon for the notification
        });
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          fetchTasks(); // Fetch tasks only if permission is granted
        }
      });
    } else if (Notification.permission === 'granted') {
      fetchTasks();
    }
  }, []);

  return null; // This component doesn't render anything, just handles notifications
};

export default NotificationComponent;

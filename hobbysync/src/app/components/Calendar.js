"use client";

const Calendar = ({ year, month, tasks, onEditTask }) => {
  // List of month names to convert the month index to the correct name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Calculate the number of days in the given month and year
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(year, month);
  
  // Get the day of the week for the first day of the month
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Create an array of numbers representing each day of the month
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Check if a task falls on a specific day, based on its recurring dates
  const isTaskOnDay = (day, task) => {
    return (task.recurringDates || []).some((date) => {
      const taskDate = new Date(date);
      return taskDate.getFullYear() === year && taskDate.getMonth() === month && taskDate.getDate() === day;
    });
  };

  // Get tasks for a specific day
  const getTasksForDay = (day) => {
    return tasks.filter(task => isTaskOnDay(day, task));
  };

  return (
    <div className="ml-9">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-0 border-black border-2 border-solid">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>

      {/* Days in Month */}
      <div className="grid grid-cols-7 auto-rows-auto gap-2 mt-4">
        {/* Empty divs to align the first day correctly */}
        {Array.from({ length: firstDayOfWeek }).map((_, index) => (
          <div className="border-black-300 border-2 border-solid w-24 md:w-auto h-24 min-h-0 md:min-h-full" key={`empty-${index}`} ></div>
        ))}
        
        {/* Render the actual days of the month */}
        {daysArray.map((day) => (
          <div key={day} className="border-black border-2 border-solid w-24 md:w-auto h-24 min-h-0 md:min-h-full relative">
            <span>{day}</span>
            {/* Render task tags inside the day cell */}
            <div className="flex flex-wrap gap-1 mt-2">
              {getTasksForDay(day).map((task, index) => (
                <div
                  key={index}
                  className="py-1 px-2 bg-white border border-gray-300 rounded-full text-xs truncate cursor-pointer"
                  style={{ backgroundColor: task.color }}
                  onClick={() => onEditTask(tasks.indexOf(task))} // Trigger editing on click
                >
                  {task.taskName.length > 6 ? `${task.taskName.slice(0, 6)}...` : task.taskName}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

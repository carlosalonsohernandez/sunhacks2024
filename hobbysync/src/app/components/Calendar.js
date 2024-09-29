"use client";

const Calendar = ({ year, month, tasks, onEditTask }) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isTaskOnDay = (day, task) => {
    return (task.recurringDates || []).some((date) => {
      const taskDate = new Date(date);
      return taskDate.getFullYear() === year && taskDate.getMonth() === month && taskDate.getDate() === day;
    });
  };

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
      <div className="grid grid-cols-7 auto-rows-min gap-2 mt-4">
        {/* Empty divs to align the first day correctly */}
        {Array.from({ length: firstDayOfWeek }).map((_, index) => (
          <div className="border-black-300 border-2 border-solid min-h-24" key={`empty-${index}`}></div>
        ))}
        
        {/* Render the actual days of the month */}
        {daysArray.map((day) => (
          <div key={day} className="border-black border-2 border-solid min-h-24 relative p-1">
            <span className="absolute top-1 left-2 text-xs">{day}</span>
            {/* Render task tags inside the day cell */}
            <div className="flex flex-col items-center justify-start gap-1 mt-4">
              {getTasksForDay(day).map((task, index) => (
                <div
                  key={index}
                  className="py-1 px-2 bg-white border border-gray-300 rounded-full text-xs truncate cursor-pointer"
                  style={{ backgroundColor: task.color }}
                  onClick={() => onEditTask(tasks.indexOf(task))} // Trigger editing on click
                >
                  {task.associatedHobby && (
                    <div className="font-bold text-xs mb-1">
                      {task.associatedHobby.length > 15 ? `${task.associatedHobby.slice(0, 15)}...` : task.associatedHobby}
                    </div>
                  )}
                  <div>
                    {task.taskName.length > 15 ? `${task.taskName.slice(0, 15)}...` : task.taskName}
                  </div>
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

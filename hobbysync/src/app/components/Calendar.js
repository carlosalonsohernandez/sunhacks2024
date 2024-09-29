// components/InteractiveBlock.js
"use client";

const Calendar = ({ year, month }) => {
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

  return (
    <div className="ml-9">
        <div>Hello There</div>
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
      <div className="grid grid-cols-7 auto-rows-auto gap-5 mt-2 ">
        {/* Empty divs to align the first day correctly */}
        {Array.from({ length: firstDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} ></div>
        ))}
        
        {/* Render the actual days of the month */}
        {daysArray.map((day) => (
          <div key={day} className="border-black border-2 border-solid">{day}</div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

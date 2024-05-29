'use client'
import React, { useState } from "react";
import CustomDatePicker from "./DatePicker";
import DayCard from "./DayCard.js";
import { getDaysInMonth, format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { StateProvider } from "./providers/StateProvider";
import { useStateContext } from "./providers/StateProvider";
import RenderList from "./RenderList";
import TariffRender from "./TariffRender";


const IndexPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {  itemsList, setItemsList, tariffList, setTariffList, setTariff } = useStateContext();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getDaysMatrix = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), daysInMonth);
    const start = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 }); // Start of the first week
    const end = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 }); // End of the last week
    const days = eachDayOfInterval({ start, end }); // Get all days of the month
    const daysMatrix = [];
  
    // Divide the days into weeks
    while (days.length > 0) {
      daysMatrix.push(days.splice(0, 7));
    }
  
    return daysMatrix;
  };

  return (
    <StateProvider>
      <div className="container mx-auto ">
        <h1 className="text-3xl font-bold mb-4 mt-2">Choose a Month</h1>
        <CustomDatePicker
          selectedDate={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
        />
        <h2 className="text-xl font-bold mt-8 mb-4">{format(selectedDate, "MMMM yyyy")}</h2>
        <div className="mx-auto w-auto flex">
          <table className="table-auto w-full md:w-1/2 mb-8 md:mb-0">
            <thead>
              <tr>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <th key={day} className="px-4 py-2 bg-gray-200">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getDaysMatrix().map((week, weekIndex) => (
                <tr key={weekIndex}>
                  {week.map((day, dayIndex) => (
                    <td key={dayIndex} className="border px-4 py-2 bg-white">
                      <DayCard day={day} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mx-auto w-auto ml-8">
            <RenderList itemsList={itemsList} setItemsList={setItemsList} className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md mb-4" />
            <TariffRender tariffList={tariffList} setTariffList={setTariffList} setTariff={setTariff} className=" mx-auto p-6 bg-white shadow-md rounded-md" />
            
          </div>
        </div>
      </div>
    </StateProvider>
  );
};

export default IndexPage;

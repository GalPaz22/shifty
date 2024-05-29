'use client';
import Link from "next/link";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { useContext, useState, useEffect } from "react";
import { useStateContext } from "../../providers/StateProvider";
import { StateProvider } from "../../providers/StateProvider";
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const DayPage = () => {
  const { date } = useParams();
  const formattedDate = date ? format(new Date(date), "dd MMMM ") : "";
  const router = useRouter();
  // Accessing state from context
  const { hoursOfWork, tariff, drives, setHoursOfWork, setTariff, setDrives, itemsList, setItemsList, tariffList  } = useStateContext();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  // State for the list of items
 ;
console.log(hoursOfWork)
console.log(tariff)

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    

    // Add the new item to the list
    const newItem = {
      date: formattedDate,
      hoursOfWork: hoursOfWork,
      tariff: tariff,
      drives: drives
    };
    setItemsList([...itemsList, newItem]);

    // Reset form inputs
    setHoursOfWork(0);
    setTariff("");
    setDrives("");

    // Navigate to the next page
    router.push(`/`);
  };
  useEffect(() => {
    if (startTime && endTime) {
      // Calculate the difference in hours between start time and end time
      const millisecondsDiff = endTime.getTime() - startTime.getTime();
      const hoursDiff = millisecondsDiff / (1000 * 60 * 60);
      // Round to two decimal places
      const roundedHoursDiff = Math.round(hoursDiff * 100) / 100;
      // Update the hoursOfWork state
      setHoursOfWork(roundedHoursDiff);
    } else {
      // If either start time or end time is null, set hoursOfWork to 0
      setHoursOfWork(0);
    }
  }, [startTime, endTime]);

  return (
    <StateProvider>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">{formattedDate}</h1>

        <form onSubmit={handleSubmit}>
        <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700">
        Hours of Work:
      </label>
      <div className="flex">
        <DatePicker
          id="startTime"
          selected={startTime}
          onChange={date => setStartTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="From"
          dateFormat="h:mm aa"
          className="input mr-2"
        />
        <span className="mr-2">to</span>
        <DatePicker
          id="endTime"
          selected={endTime}
          onChange={date => setEndTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="To"
          dateFormat="h:mm aa"
          className="input"
        />
      </div>

          <div className="mb-4">
            <label
              htmlFor="tariff"
              className="block text-sm font-medium text-gray-700"
            >
              Rate:
            </label>
            <select
              id="tariff"
              value={tariff}
              onChange={(e) => setTariff(e.target.value)}
              className="input"
            >
              <option value="">Select Rate</option>
              <option value="80">80</option>
              <option value="100">100</option>
              <option value={tariffList[0]}>{tariffList[0]}</option>
              <option value={tariffList[1]}>{tariffList[1]}</option>
              <option value={tariffList[2]}>{tariffList[2]}</option>
              
            </select>
          </div>

          <div>
            <label
              htmlFor="drives"
              className="block text-sm font-medium text-gray-700"
            >
              Drives:
            </label>
            <input
              type="number"
              id="drives"
              min="0"
              value={drives}
              onChange={(e) => setDrives(e.target.value)}
              className="input"
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ">
            Submit
          </button>
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Calculator</h2>
            <p className="bg-gray-200 p-4 rounded-md">{hoursOfWork* tariff + drives*25 + '₪'}</p>
          </div>
        </form>

        <br />
        <Link href={"/"} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Back</Link>
      </div>
    </StateProvider>
  );
};

export default DayPage;

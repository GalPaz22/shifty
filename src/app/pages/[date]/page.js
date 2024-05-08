'use client';
import Link from "next/link";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { useContext, useState } from "react";
import { useStateContext } from "../../providers/StateProvider";
import { StateProvider } from "../../providers/StateProvider";
import { useRouter } from 'next/navigation';

const DayPage = () => {
  const { date } = useParams();
  const formattedDate = date ? format(new Date(date), "dd MMMM ") : "";
  const router = useRouter();
  // Accessing state from context
  const { hoursOfWork, tariff, drives, setHoursOfWork, setTariff, setDrives, itemsList, setItemsList, tariffList  } = useStateContext();
 
  // State for the list of items
  

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

  return (
    <StateProvider>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">{formattedDate}</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="hours"
              className="block text-sm font-medium text-gray-700"
            >
              Hours of Work:
            </label>
            <input
              type="number"
              id="hours"
              value={hoursOfWork}
              onChange={(e) => setHoursOfWork(e.target.value)}
              className="input"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tariff"
              className="block text-sm font-medium text-gray-700"
            >
              Tariff:
            </label>
            <select
              id="tariff"
              value={tariff}
              onChange={(e) => setTariff(e.target.value)}
              className="input"
            >
              <option value="">Select Tariff</option>
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
          <button type="submit" className="btn">
            Submit
          </button>
        </form>

        <br />
        <Link href={"/"}>Back</Link>
      </div>
    </StateProvider>
  );
};

export default DayPage;

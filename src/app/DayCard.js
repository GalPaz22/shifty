import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

const DayCard = ({ day }) => {
  const formattedDate = format(day, 'dd MMMM ');
  const linkHref = `./pages/${formattedDate}`;

  return (
    <Link href={linkHref}>
      <div className="cursor-pointer hover:bg-gray-300 p-4 m-2 transition duration-300 ease-in-out transform hover:scale-105">
        <p className="text-gray-700 font-semibold">{formattedDate}</p>
      </div>
    </Link>
  );
};

export default DayCard;

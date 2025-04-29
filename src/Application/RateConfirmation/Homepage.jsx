// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import Skt from '../assets/images/Skt-PhotoRoom.png-PhotoRoom.png';

export default function Homepage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      {/* Skt image */}
      <img src={Skt} alt="Skt" className="mt-8" /> {/* Apply margin-top for spacing */}

      <div className="flex justify-center gap-10 mt-10"> {/* Adjust flex container to horizontal alignment */}
        {/* First card */}
        <div className="max-w-sm p-6 bg-white border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">Rate Fixing Form</h1>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          </p>
          <Link to="/open" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span>Rate Fixing Details</span>
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Link>
        </div>

        {/* Second card */}
        <div className="max-w-sm p-6 bg-white border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">Rate Fixing Report</h1>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          </p>
          <Link to="/report" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span>Rate Fixing Report</span>
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Link>
        </div>

        {/* Third card */}
        <div className="max-w-sm p-6 bg-white border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">Rate Fixing Summary Report</h1>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          </p>
          <Link to="/cons" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span>Summary Report</span>
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

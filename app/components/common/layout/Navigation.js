import React, { useState } from 'react';
import logo from '../../../images/logo.svg';
import { useRouteMatch } from 'react-router-dom';
import withAuth from '../../redux/providers/withAuth';
import { Link } from 'react-router-dom';

function isActiveMenu(menu) {
  var res = false;
  const match = useRouteMatch(menu);
  if (match && match.isExact) {
    res = true;
  }

  return res;
}
const Navigation = (props) => {
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSideMenuOpen ? 'overflow-hidden' : ''
      }`}
    >
      {/* Desktop sidebar */}
      <aside className="z-20 hidden w-64 overflow-y-auto bg-[#1E1E2D] dark:bg-gray-800 md:block flex-shrink-0">
        <div className="pb-4 text-[#ADACAC] ">
          <Link to="/dashboard" className="cursor-pointer">
            <img src={logo} alt="" className="my-3 mx-3 h-full px-2 w-16" />
          </Link>

          <ul className="mt-6">
            <li
              className={`relative px-6 py-3 ${
                isActiveMenu('/dashboard') ? 'bg-primary text-secondary' : ''
              }`}
            >
              {/* <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span> */}
              <Link
                className="inline-flex items-center w-full text-sm font-semibold  transition-colors duration-150 hover:text-white dark:hover:text-gray-200 dark:text-gray-100"
                to="/dashboard"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span className="ml-4">Dashboard</span>
              </Link>
            </li>
          </ul>
          <NavList />
        </div>
      </aside>
      {/* Desktop sidebar */}
      {/* Mobile sidebar */}
      {/* Backdrop */}
      {isSideMenuOpen ? (
        <div
          className={`fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center md:hidden transition ease-in-out duration-150 
        ${isSideMenuOpen ? 'opacity-100' : 'opacity-0'}
        `}
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
        ></div>
      ) : (
        ''
      )}
      <aside
        className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-[#1E1E2D] dark:bg-gray-800 md:hidden transition ease-in-out duration-150 
      ${isSideMenuOpen ? 'opacity-100' : 'opacity-0 transform -translate-x-20'}
      `}
      >
        <div className="py-4 text-gray-500 dark:text-gray-400">
          {/* <a
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            href="#"
          >
            Windmill
          </a> */}
          <ul className="mt-6">
            <li className="relative px-6 py-3 bg-[#EABA4C]">
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
              <a
                className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-white dark:hover:text-gray-200 dark:text-gray-100"
                href="index.html"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span className="ml-4">Dashboard</span>
              </a>
            </li>
          </ul>
          <NavList />
        </div>
      </aside>
      <div className="flex flex-col flex-1 w-full">
        <header className="z-10 py-4 bg-[#1E1E2D] shadow-md dark:bg-gray-800  h-20">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-[#E0AC32] dark:text-[#E0AC32]">
            {/* Mobile hamburger */}
            <button
              className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
              onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
              aria-label="Menu"
            >
              <svg
                className="w-8 h-8"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <a
              className="block px-4 py-2 text-sm text-primary hover:text-primary-dark cursor-pointer"
              onClick={() => props.logout()}
            >
              Sign out
            </a>
          </div>
        </header>
        <main className="h-full overflow-y-auto p-4">{props.children}</main>
      </div>
    </div>
  );
};
export default withAuth(Navigation);

export const NavList = () => {
  return (
    <ul>
      <li
        className={`relative px-6 py-3 ${
          isActiveMenu('/dashboard/plans') ? 'bg-primary text-secondary' : ''
        }`}
      >
        <Link
          className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white dark:hover:text-gray-200"
          to="/dashboard/plans"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
          <span className="ml-4">Plans</span>
        </Link>
      </li>
      <li
        className={`relative px-6 py-3 ${
          isActiveMenu('/dashboard/ReferralRates')
            ? 'bg-primary text-secondary'
            : ''
        }`}
      >
        <Link
          className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white dark:hover:text-gray-200"
          to="/dashboard/ReferralRates"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
          <span className="ml-4">Referral Rates</span>
        </Link>
      </li>
      <li
        className={`relative px-6 py-3 ${
          isActiveMenu('/dashboard/assets') ? 'bg-primary text-secondary' : ''
        }`}
      >
        <Link
          className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white dark:hover:text-gray-200"
          to="/dashboard/assets"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
          <span className="ml-4">Assets</span>
        </Link>
      </li>
      <li
        className={`relative px-6 py-3 ${
          isActiveMenu('/dashboard/releases') ? 'bg-primary text-secondary' : ''
        }`}
      >
        <Link
          className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white dark:hover:text-gray-200"
          to="/dashboard/releases"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
          <span className="ml-4">Releases</span>
        </Link>
      </li>
      <li
        className={`relative px-6 py-3 ${
          isActiveMenu('/dashboard/users') ? 'bg-primary text-secondary' : ''
        }`}
      >
        <Link
          className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white dark:hover:text-gray-200"
          to="/dashboard/users"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <span className="ml-4">Users</span>
        </Link>
      </li>
      <li
        className={`relative px-6 py-3 ${
          isActiveMenu('/dashboard/sliders') ? 'bg-primary text-secondary' : ''
        }`}
      >
        <Link
          className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white dark:hover:text-gray-200"
          to="/dashboard/sliders"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <span className="ml-4">Sliders</span>
        </Link>
      </li>
    </ul>
  );
};

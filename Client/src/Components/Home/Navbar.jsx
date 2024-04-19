import React, { useState } from "react";
import { Popover, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for menu open/close

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const solutions = [
    {
      name: "Insights",
      description: "Measure actions your users take",
      href: "##",
      icon: IconOne,
    },
    {
      name: "Automations",
      description: "Create your own targeted content",
      href: "##",
      icon: IconTwo,
    },
    {
      name: "Reports",
      description: "Keep track of your growth",
      href: "##",
      icon: IconThree,
    },
    {
      name: "Reports",
      description: "Keep track of your growth",
      href: "##",
      icon: IconThree,
    },
  ];

  const startTour = () => {
    setIsOpen(!isOpen);
    const driverObj = driver({
      showProgress: true, // Because everyone loves progress bars!
      steps: [
        {
          // element: '#element-of-mystery',
          element: document.getElementById("componentAElement"),
          popover: {
            title: "Abracadabra!",
            description: "Watch as I reveal the secrets of this element.",
          },
        },
        {
          // element: '#element-of-mystery',
          element: document.getElementById("landingComponent"),
          popover: {
            title: "Landing Page",
            description: "Watch as I reveal the secrets of this element.",
          },
        },
        {
          // element: '#element-of-mystery',
          element: document.getElementById("dropComponent"),
          popover: {
            title: "Drag and Drop PDF",
            description:
              "Drag and Drop your PDF file of click on button to upload",
          },
        },
        {
          // element: '#element-of-mystery',
          element: document.getElementById("featureComponent"),
          popover: {
            title: "Feature of system ",
            description: "Application of the system.",
          },
        },
      ],
    });
    driverObj.drive();
  };

  return (
    <>
      <nav
        id="componentAElement"
        class="bg-white border-gray-200 dark:bg-blue-500"
      >
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-3xl font-bold whitespace-nowrap font-signature dark:text-white">
              Data Miners
            </span>
          </a>

          <div class="hidden w-full md:block md:w-auto" id="navbar-multi-level">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4   rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0  ">
              <li>
                <Link to="/"
                  href="#"
                  class="block py-2 px-3 text-white rounded md:bg-transparent hover:text-blue-700 md:text-white md:p-0 "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={`
                ${open ? "text-white" : "text-white/90"}
                group inline-flex items-center  text-base font-medium hover:text-blue-700 focus:outline-none `}
                      >
                        <span>Solutions</span>
                        {/* <ChevronDownIcon
                className={`${open ? 'text-orange-300' : 'text-orange-300/70'}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-orange-300/80`}
                aria-hidden="true"
              /> */}
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-[100] left-1/2 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                            <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                              {solutions.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                    <item.icon aria-hidden="true" />
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">
                                      {item.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                            <div className="bg-gray-50 p-4">
                              <a
                                href="##"
                                className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                              >
                                <span className="flex items-center">
                                  <span className="text-sm font-medium text-gray-900">
                                    Documentation
                                  </span>
                                </span>
                                <span className="block text-sm text-gray-500">
                                  Start integrating products and tools
                                </span>
                              </a>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </li>
              <li>
                <Link to="/pdfData"
                  href="#"
                  class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white "
                >
                  Large Documents
                </Link>
              </li>
              <li>
                <a
                  onClick={startTour}
                  href="#"
                  class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                >
                  Tour
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile menu (hamburger menu) */}
      <div className="md:hidden fixed inset-0 z-50 h-12 bg-white dark:bg-blue-500">
        <div className="flex justify-between items-center p-4">
          <span className="text-3xl font-bold whitespace-nowrap font-signature dark:text-white">
            Data Miners
          </span>

          <button
            className="text-gray-300 cursor-pointer text-xl transition-all duration-300 leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={toggleMenu}
          >
            {!isOpen ? (
              <GiHamburgerMenu color="white" className="mx-1" />
            ) : (
              <IoClose color="white" className="mx-1 animateCross" />
            )}
          </button>
        </div>

        <div
          className={
            "flex-grow bg-blue-500 items-center flex flex-col mt-1 md:hidden right-0 left-0" +
            (isOpen ? " fixed" : " hidden")
          }
          id="example-navbar-danger"
        >
          <Link to="/"
           
            href="#"
            className="py-2 text-xl"
            onClick={toggleMenu}
          >
            Home
          </Link>

          <Link to="/pdfData" href="#" className="py-2 text-xl" onClick={toggleMenu}>
            Large Documents
          </Link>
          <a  onClick={startTour} href="#" className="py-2 text-xl" >
            Tour
          </a>
          <a href="#" className="py-2 text-xl" onClick={toggleMenu}>
            Contact
          </a>
        </div>
      </div>
    </>
  );
};
function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  );
}
export default Navbar;

import React, { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="info justify-center items-center text-center h-full content-center"
      >
        <h1 className="text-[17px] text-gray-400">Easy insights from PDF</h1>
        {isOpen && (
          <div className="absolute top-15 w-[250px] rounded-lg h-20 justify-start border  text-left text-black">
            <div>
              <h3>PDF to CSV</h3>
              <h3>PDF to JSON</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;

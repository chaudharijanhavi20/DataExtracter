import React, { useState } from "react";
import PDF from "../assets/PDF.png";
import Papa from 'papaparse';
import {useNavigate} from 'react-router-dom';
import JsonData from './JsonData';
const PDFUpload = () => {
  const [file, setFile] = useState();
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const fileReader = new FileReader();
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);


    Papa.parse(e.target.files[0], {
      header: true,
      complete: results => {
        console.log(results)
        setParsedCsvData(results.data);
        navigate("/JsonData",{state:results.data})
      },
    });
  };
  return (
    <>
      <div className="home flex h-[615px] ">
        <div className="w-2/6 flex flex-col justify-center items-center  px-8">
          <div>
            <h1 className="font-bold text-[30px]">
              Welcome,{" "}
              <span className="text-blue-600 ml-1 mr-1 "> Upload your PDF</span>{" "}
              to get started.{" "}
            </h1>

            <h2 className="justify-start text-[18px] mt-4 text-gray-500">
              For example, upload PDF of invoice.
            </h2>
          </div>
        </div>
        <div className="w-4/6 flex flex-row justify-center items-center">
          <div className="h-5/6 w-5/6 rounded-lg  bg-blue-50 flex flex-row justify-center items-center">
            <div className="border border-blue-500 border-dashed rounded-2xl   bg-white text-center content-center h-5/6 w-5/6">
              <img src={PDF} width="40px" />
              <h1 className="text-[20px]">
                Drag and drop or click here to add a PDF file
              </h1>
              <button className="mt-10 p-2 border px-12 rounded-md bg-blue-500 text-white font-semibold">
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3 w-96">
        <label
          htmlFor="formFile"
          className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
        >
          Default file input example
        </label>
        <input
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          type="file"
          id="formFile"
          onChange={handleOnChange}
          
        />
      </div>
    </>
  );
};

export default PDFUpload;

import React from "react";
import Drag from "../assets/drag.png";
import Data from "../assets/extraction.gif"
import Drop from "../assets/upload.gif";
import Conversion from "../assets/conversion.gif"

const Working = () => {
  return (
    <div id="featureComponent" class="w-full h-full bg-white ">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center h-full ">
        <div>
          <p className="text-black text-center text-5xl font-bold pt-10">
            How the system works
          </p>
          <p className="text-blue-500 text-center text-xl mt-5">
           "Whole Approach And end-to-end Process Automation"
          </p>
        </div>

        <div className="min-w-screen mx-auto flex flex-col items-center justify-center  sm:px-4 md:flex-row sm:mt-20">
          <div className="grid mt-2 sm:grid-cols-1 md:grid-cols-2 sm:gap-20 gap-5 sm:px-12 px-6 mb-10">
            <div>
              <p className="text-black text-2xl font-bold">
                Seamless Ingestion
              </p>
              <p className="text-black mt-5 text-justify">
                Effortlessly import files from popular sources like Gmail,
                Dropbox, Drive, SharePoint, and more.
              </p>
            </div>
            <div>
              <img
                className=" rounded-xl w-full sm:h-72 h-48 shadow shadow-blue-400   hover:scale-105"
                src={Drop}
                alt=""
              ></img>
            </div>
          </div>
        </div>

        <div className="min-w-screen mx-auto flex flex-col items-center justify-center sm:px-4 md:flex-row">
          <div className="grid mt-2 sm:grid-cols-1 md:grid-cols-2 gap-8 sm:px-12 px-6 mb-10">
            <img
              className=" rounded-xl w-full sm:h-72 h-48 shadow shadow-blue-400   hover:scale-105"
                src={Data}
                alt=""
            ></img>

            <div className="sm:ml-4">
              <p className="text-black  text-2xl font-bold">
                Intelligent Extraction
              </p>
              <p className="text-black mt-5 text-justify">
                uses a GeminiAI an open source GenerativeAI model for extracting
                data from different documents such as Invoices, Bill of lading,
                shipping bills, Airway bills,etc.Gemini Pro Vision will then
                help to convert above documents in a structured JSON or CSV
                format while maintaining the originality and structure of the
                data.
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-screen mx-auto flex flex-col items-center justify-center  sm:px-4 md:flex-row">
          <div className="grid mt-2 sm:grid-cols-1 md:grid-cols-2 gap-8 sm:px-12 px-6 mb-10">
            <div>
              <p className="text-black text-2xl font-bold">
                Learn from conversion of document
              </p>
              <p className="text-black mt-5 text-justify">
                Reward model will then judge the output and score the model
                accordingly making it continuously learn from its conversions of
                documents. So that in future any type of document with anytype
                of layout can be processed and structured data can be generated.
              </p>
            </div>
            <div>
              <img
                className=" rounded-xl w-full sm:h-72 h-48 shadow shadow-blue-400 hover:scale-105"
                src={Conversion}
                alt=""
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;

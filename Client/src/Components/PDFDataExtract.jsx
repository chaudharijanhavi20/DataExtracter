import React, { useEffect, useState } from "react";
import pdfToText from "react-pdftotext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "./Home/Navbar";
const genAI = new GoogleGenerativeAI("AIzaSyAyXKeVogNf-gsKkwQ4E43YOXzN5s9ww3E");
import { JsonEditor } from "json-edit-react";

const PDFDataExtract = () => {
  const [textData, setTextData] = useState("");
  const [fileName, setFileName] = useState("");
  const [finalAns, setFinalAns] = useState("");
  function extractText(event) {
    const file = event.target.files[0];
    console.log(file);
    setFileName(file.name);
    pdfToText(file)
      .then((text) => {
        console.log(text);
        setTextData(text);
        pdfJson(text);
      })
      .catch((error) => console.error("Failed to extract text from pdf"));
  }

  const pdfJson = async (text) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const prompt =
      "following contains text from document, please provide me important insights in usefull json format :" +
      JSON.stringify(text);
    console.log(prompt);

    const result = await model.generateContent(prompt);
    const cleanedResponse = JSON.parse(result.response.text().replace(/(\bjson\b|`)/gi, ""));
    setFinalAns(cleanedResponse);
  };

  const onEdit = ({
    newData,
    currentData,
    newValue,
    currentValue,
    name,
    path,
  }) => {
    // Your logic for handling edit event
    console.log("Edit occurred:");
    console.log("New data:", newData);
    console.log("Current data:", currentData);
    console.log("New value:", newValue);
    console.log("Current value:", currentValue);
    console.log("Name:", name);
    console.log("Path:", path);
  };

  const onDelete = ({ newData, currentData, name, path }) => {
    // Your logic for handling delete event
    console.log("Delete occurred:");
    console.log("New data:", newData);
    console.log("Current data:", currentData);
    console.log("Name:", name);
    console.log("Path:", path);
  };

  const onAdd = ({ newData, currentData, newValue, name, path }) => {
    console.log("Add occurred:");
    console.log("New data:", newData);
    console.log("Current data:", currentData);
    console.log("New value:", newValue);
    console.log("Name:", name);
    console.log("Path:", path);
  };

  const copyJsonToClipboard = () => {
    const jsonDataStream = document.querySelector(".jsonDataStream");
    if (jsonDataStream) {
      const jsonText = jsonDataStream.textContent;
      navigator.clipboard
        .writeText(jsonText)
        .then(() => alert("JSON data copied to clipboard!"))
        .catch((error) => console.error("Failed to copy JSON data: ", error));
    } else {
      console.error("No JSON data found to copy.");
    }
  };
 


  return (
    <>
    <div className="jsonData flex flex-row">
    <div className="w-full  items-center justify-center content-center p-4 mt-3">
      <h1 className="text-center font-bold text-2xl mb-3">DATA IN JSON FORMAT</h1>
      <input type="file" accept="application/pdf" className="" onChange={extractText} />
      <div className="codeSnippet w-full h-auto border bg-black ">
        <div className="copyButton text-white flex justify-between bg-blue-200 p-3 top-0 ">
          <h1 className="text-black font-bold">JSON</h1>
          
          <button
            className="text-black font-bold"
           onClick={copyJsonToClipboard}
          >
            Copy
          </button>
        </div>
        
        <div className="text-blue-400 text-xl">{fileName}</div>
        <div style={{ whiteSpace: "pre" }} className="jsonDataStream text-white">
          <JsonEditor
            className="bg-black w-full"
            onEdit={onEdit}
            onDelete={onDelete}
            onAdd={onAdd}
            data={finalAns}
            theme={[
              "githubDark",
              {
                iconEdit: "gray",
                boolean: {
                  color: "red",
                  fontStyle: "italic",
                  fontWeight: "bold",
                  fontSize: "80%",
                  
                },
              },
            ]}
          />
         
        </div>
      </div>
    </div>
  </div>
</>
);
};

export default PDFDataExtract;

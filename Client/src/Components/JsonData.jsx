import React, { useRef, useState, useEffect } from "react";
import Navbar from "./Home/Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLocation } from "react-router-dom";
const PDFJS = window.pdfjsLib;
const genAI = new GoogleGenerativeAI("AIzaSyAyXKeVogNf-gsKkwQ4E43YOXzN5s9ww3E");
import { JsonEditor } from "json-edit-react";

const JsonData = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null); // Added state to store invoice data
  const { pdfFile } = location.state || {}; // Access the passed PDF file
  const [text, setText] = useState("");
  // Debugging console.log
  console.log("Received PDF File:", pdfFile);

  useEffect(() => {
    convertPdfToImage(pdfFile);
  }, []);

  const convertPdfToImage = (pdfFile) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      const pdfData = await PDFJS.getDocument({ data: arrayBuffer });
      processPdfPages(pdfData);
    };
    reader.readAsArrayBuffer(pdfFile);
  };
  const processPdfPages = async (pdfData) => {
    const page = await pdfData.getPage(1); // Get the first page
    const viewport = page.getViewport({ scale: 1.0 }); // Adjust scale if needed
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;

    // Convert canvas to base64
    const imageData = canvas.toDataURL("image/png");

    // Prepare image object
    const image = {
      inlineData: {
        data: imageData.replace(/^data:image\/(png|jpg);base64,/, ""),
        mimeType: "image/png",
      },
    };

    // Send prompt and image to API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const prompt =
      "extract data from the given image and give it in useful json format";
    const result = await model.generateContent([prompt, image]);
    // console.log(result.response.text());
    // let text = "";
    // for await (const chunk of result.stream) {
    //   const chunkText = chunk.text();
    //   console.log(chunkText);
    //   setText((prevText) => prevText + chunkText);
    // // }
    // setText(result.response.text());
    // Assuming responseData contains the JSON response with the 'json' keyword and backticks
    // const cleanedResponse = result.response
    //   .text()
    //   .replace(/(\bjson\b|`)/gi, "");
    const cleanedResponse = JSON.parse(result.response
      .text()
      .replace(/(\bjson\b|`)/gi, ""));
    setText(cleanedResponse);
    setInvoiceData(JSON.parse(cleanedResponse)); // Set invoice data state
    setLoading(false); // Set loading state to false
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
      <Navbar />
      <div className="jsonData flex flex-row">
        <div className="w-full  items-center justify-center content-center p-4 mt-3">
          <h1 className="text-center font-bold text-2xl mb-3">DATA IN JSON FORMAT</h1>
          <div className="codeSnippet w-full h-auto border bg-black ">
            <div className="copyButton text-white flex justify-between bg-blue-200 p-3 top-0">
              <h1 className="text-black font-bold">JSON</h1>
              <button
                className="text-black font-bold"
               onClick={copyJsonToClipboard}
              >
                Copy
              </button>
            </div>
            <div style={{ whiteSpace: "pre" }} className="jsonDataStream text-white">
              <JsonEditor
                className="bg-black w-full"
                onEdit={onEdit}
                onDelete={onDelete}
                onAdd={onAdd}
                data={text}
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

export default JsonData;

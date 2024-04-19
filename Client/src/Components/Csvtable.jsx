import { useEffect, useState, Fragment, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CsvDownloadButton from "react-json-to-csv";
import "./csvtable.css";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import Pdfcontext from "../context/pdfcontext";

const suggestions = [
  "Some keys are missing ?",
  "Key value doesn't match?",
  "Need some more details",
  "Scan again!",
  "Incomplete data",
  "Logithon Jitna hai bhai",
];

function getRandom() {
  const shuffled = suggestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}

export default function CsvTable() {
  const navigate = useNavigate();

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  let [isunopen, setisunopen] = useState(false);
  function badcloseModal() {
    setisunopen(false);
  }
  function badopenModal(suggest) {
    setuserfeedback(suggest);

    setisunopen(true);
  }
  const { pdfdata, setpdfdata } = useContext(Pdfcontext);
  console.log(pdfdata);
  const [objectData, setObjectData] = useState(pdfdata);
  const [searchKey, setSearchKey] = useState("");
  const [sortedKeys, setSortedKeys] = useState(Object.keys(objectData));
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [deletedTaskHistory, setDeletedTaskHistory] = useState([]);
  const [updatedTaskHistory, setUpdatedTaskHistory] = useState([]);
  const [userfeedback, setuserfeedback] = useState("");
  useEffect(() => {
    console.log(updatedTaskHistory, deletedTaskHistory);
  }, [updatedTaskHistory, deletedTaskHistory]);
  const addKeyValuePair = () => {
    if (newKey.length === 0 || newValue.length === 0) {
      toast.error("Please Fill details before adding");
    } else {
      setObjectData({
        ...objectData,
        [newKey]: newValue,
      });
      setNewKey("");
      setNewValue("");
      setSortedKeys([...sortedKeys, newKey]);
      toast.success("Key Value Pair Added successfully");
    }
  };

  const deleteKeyValuePair = (key) => {
    const updatedData = { ...objectData };
    const deletedTask = {
      key: key,
      value: updatedData[key],
    };
    delete updatedData[key];
    setObjectData(updatedData);
    setSortedKeys(sortedKeys.filter((k) => k !== key));
    setDeletedTaskHistory([...deletedTaskHistory, deletedTask]);
    toast.success("Key Value Pair deleted successfully");
  };

  const editKeyValuePair = (key, value) => {
    setObjectData({
      ...objectData,
      [key]: value,
    });
    const updatedTask = {
      key: key,
      value: value,
    };
    setUpdatedTaskHistory([...updatedTaskHistory, updatedTask]);
  };

  const editKey = (oldKey, newKey) => {
    if (oldKey !== newKey) {
      const updatedData = { ...objectData };
      const updatedTask = {
        key: newKey,
        value: updatedData[oldKey],
      };
      updatedData[newKey] = updatedData[oldKey];
      delete updatedData[oldKey];
      setObjectData(updatedData);
      setSortedKeys(sortedKeys.map((k) => (k === oldKey ? newKey : k)));
      setUpdatedTaskHistory([...updatedTaskHistory, updatedTask]);
      console.log(updatedTaskHistory);
    }
    toast.success("Key Value Pair Updated successfully");
  };

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

  const filteredKeys = sortedKeys.filter((key) =>
    key.toLowerCase().includes(searchKey.toLowerCase())
  );
  const handlefeedbacksubmit = () => {
    if (userfeedback.length === 0) {
      toast.error("Please add feedback before submitting");
    } else {
      toast.success("Your feedback has been submitted!");
      badcloseModal();
    }
  };

  const selectedSuggestions = getRandom();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-transparent backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <span className="text-green-500 text-2xl">
                      Model output accepted
                    </span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <span className="text-md text-gray-500 text-center mx-auto font-medium">
                      Thanks for Feedback it will help in improving model
                      performance
                    </span>
                  </div>

                  <div className="mt-4 mx-auto text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Yup!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isunopen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={badcloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-transparent backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-red-500"
                  >
                    Model output not satisfied
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please provide us your feedback on what we failed to
                      generate so that our model can consider it for further use
                    </p>
                    <div class="mb-4">
                      <label
                        for="message"
                        class="text-sm leading-7 text-gray-600"
                      >
                        Feedback
                      </label>
                      <div className="flex flex-wrap w-full justify-around mb-4">
                        {selectedSuggestions.map((suggest, index) => (
                          <div
                            onClick={() => badopenModal(suggest)}
                            key={index}
                            className="border border-solid w-[48%] hover:bg-gray-300 border-gray-200 rounded-md p-2 mb-2"
                          >
                            <h2>{suggest}</h2>
                          </div>
                        ))}
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Enter Improvements!"
                        value={userfeedback}
                        onChange={(e) => setuserfeedback(e.target.value)}
                        class="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handlefeedbacksubmit}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="outputPage flex justify-evenly p-8  ">
        <div className="csvtableData border border-gray-300 shadow-sm rounded-lg overflow-hidden w-full  sm:w-2/3 mx-auto  ">
          <div className="taskBar w-full flex justify-between bg-blue-500 p-3">
            <button class="downButton bg-white hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center ">
              <svg
                class="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <CsvDownloadButton
                className=" rounded-sm font-bold"
                title="download"
                data={[objectData]}
                filename="pdfinsight"
              />
            </button>
            <input
              type="text"
              placeholder="Search key..."
              value={searchKey}
              className="p-2 rounded-md"
              onChange={handleSearch}
            />
          </div>
          <table className="w-full text-sm leading-5">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Key
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Value
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredKeys.map((key) => (
                <tr key={key}>
                  <td
                    className="py-3 px-4 text-left font-medium text-gray-600"
                    contentEditable
                    onBlur={(e) => editKey(key, e.target.textContent)}
                  >
                    {key}
                  </td>
                  <td
                    className="py-3 px-4 text-left font-medium text-gray-600"
                    contentEditable
                    // onBlur={(e) => editKeyValuePair(key, e.target.textContent)}
                  >
                    {console.log(objectData[key])}
                    {typeof objectData[key] !== "object"
                      ? objectData[key]
                      : objectData[key]===null?objectData[key]:Object.entries(objectData[key]).map(([key, value]) => (
                        <div key={key}>
                          <p>
                            <strong>{key}:</strong> {value}
                          </p>
                        </div>
                      ))}
                  </td>
                  <td className="py-3 px-4 text-left font-medium ">
                    <button onClick={() => deleteKeyValuePair(key)}>
                      <svg
                        class=" text-red-600 w-8 h-8  mx-auto"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              <tr className=" my-6 text-right">
                <td colSpan={3}>
                  <div className="flex  gap-8 justify-center w-full text-right">
                    <button
                      class="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border  rounded-md border-gray-400 h-12 text-sm flex items-center gap-1 lg:gap-2"
                      onClick={openModal}
                    >
                      <svg
                        class="w-12 h-12"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                        ></path>
                      </svg>
                    </button>

                    <button
                      class="py-1.5 px-3 hover:text-red-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-12 text-sm flex items-center gap-1 lg:gap-2"
                      onClick={badopenModal}
                    >
                      <svg
                        class="w-12 h-12"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="csvModification flex-col justify-center items-center">
          <div className="keyupdate w-96 h-64 flex flex-col justify-evenly items-center border mx-auto border-blue-500 rounded-lg p-5">
            <div class="form-control w-full">
              <input
                type="text"
                required=""
                className="w-full"
                placeholder="Add Your Key"
                class="input input-alt"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
              />
              <span class="input-border input-border-alt"></span>
            </div>

            <div class="form-control w-full">
              <input
                type="text"
                required=""
                placeholder="Add Your Value"
                class="input input-alt"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              <span class="input-border input-border-alt"></span>
            </div>
            <button
              class="w-24 h-10 hover:scale-90 rounded-md flex justify-center items-center bg-blue-500 p-4 text-white"
              onClick={addKeyValuePair}
            >
              <span class="text-white">Add</span>
            </button>
          </div>
          <div class="border border-blue-500 shadow-sm rounded-lg overflow-hidden max-w-sm mx-auto mt-3">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Update History
              </h3>
            </div>
            <table class="w-full text-sm leading-5">
              <thead class="bg-blue-500">
                <tr>
                  <th class="py-3 px-4 text-left font-medium text-white">
                    Updated Key
                  </th>
                  <th class="py-3 px-4 text-left font-medium text-white">
                    Updated Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {updatedTaskHistory.length > 0 ? (
                  updatedTaskHistory.map((task, index) => (
                    <tr key={index}>
                      <td class="py-3 px-4 text-left font-medium text-gray-600">
                        {task.key}
                      </td>
                      <td class="py-3 px-4 text-left">{task.value}</td>
                    </tr>
                  ))
                ) : (
                  <h1 className="py-3 px-4 text-center font-bold">
                    No Update Found
                  </h1>
                )}
              </tbody>
            </table>
          </div>
          <div class=" shadow-sm  overflow-hidden border border-blue-500 rounded-lg max-w-sm mx-auto mt-3">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Delete History
              </h3>
            </div>
            <table class="w-full text-sm leading-5">
              <thead class="bg-blue-500">
                <tr>
                  <th class="py-3 px-4 text-left font-medium text-white">
                    Deleted Key
                  </th>
                  <th class="py-3 px-4 text-left font-medium text-white">
                    Deleted Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {deletedTaskHistory.length > 0 ? (
                  deletedTaskHistory.map((task, index) => (
                    <tr key={index}>
                      <td class="py-3 px-4 text-left font-medium text-gray-600">
                        {task.key}
                      </td>
                      <td class="py-3 px-4 text-left">{task.value}</td>
                    </tr>
                  ))
                ) : (
                  <h1 className="py-3 px-4 text-center font-bold">
                    No Delete Found
                  </h1>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

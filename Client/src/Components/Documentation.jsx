import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Pdf from "../assets/pdftodata.png";
import Healthcare from "../assets/healthcare.png";
import Manufactured from "../assets/manufactured.jpg";

const content = [
  {
    title:
      "Automate Accounts Payable to scale 10x with processing costs in check",
    description:
      "Automate the collection of invoices from emails and purchase orders from SAP using a PDF to data converter. By extracting data from PDF documents, you can streamline the process, eliminating the need to manually chase approvers. Centralize all data in one place to track progress and provide timely updates to vendors, improving relationships and efficiency in procurement processes.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-black">
        <img
          src={Pdf}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Optimise Supply Chain for 30% faster order processing",
    description:
      "Utilize a PDF to data converter to gather historical data from SAP, Square, and Tableau. This data will be used to optimize production, efficiently manage inventory, and make accurate predictions about future demand. By achieving these objectives, businesses can ensure blazing-fast delivery times, delighting customers, and ultimately boosting customer retention.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-black">
        <img
          src={Manufactured}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title:
      "Revolutionise Healthcare Efficiency with report summarisation in seconds",
    description:
      "Using a PDF to visualization or data or JSON converter, the textual description provided could be transformed into actionable insights or structured data. For instance, it could be visualized as a dynamic timeline showcasing the frequency and impact of real-time updates on project progress, aiding in understanding the significance of version control. Alternatively, key data points such as time saved from manual updates and the resultant impact on team alignment could be extracted and structured for analysis. Additionally, converting the description into JSON format could facilitate seamless integration with other systems or tools, streamlining workflow management and enhancing decision-making processes.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-black">
        <img
          src={Healthcare}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];

const Documentation = () => {
  return (
    <div class="w-full h-screen bg-white">
      <div>
        {" "}
        <p className="text-black text-4xl font-bold text-center mt-10">
          How Businesses can use this system
        </p>
      </div>
      <p className="text-blue-500 text-xl text-center mt-5">
        "How PDF converters can expand business capabilities"
      </p>
      <div>
        <StickyScroll content={content} />
      </div>
    </div>
  );
};

export default Documentation;

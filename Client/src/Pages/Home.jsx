import React, { useEffect } from "react";
import Documentation from "../Components/Documentation";
import Working from "../Components/Working";
import Landing from "../Components/Landing";
import Footer from "../Components/Footer";
import { driver } from 'driver.js';

import 'driver.js/dist/driver.css'; 

export default function Home() {


  return (
    <div>
      <Landing/>
      <Working />
      <Documentation />
      <Footer/>
    </div>
  );
}

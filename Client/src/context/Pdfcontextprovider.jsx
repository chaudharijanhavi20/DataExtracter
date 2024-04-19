import React, { useState } from "react";
import Pdfcontext from "./pdfcontext";

const Pdfcontextprovider =({children})=>{
    const [pdfdata,setpdfdata]=useState(null)
    return (
        <Pdfcontext.Provider value={{pdfdata,setpdfdata}}>
            {children}
        </Pdfcontext.Provider>
    )
}

export default Pdfcontextprovider
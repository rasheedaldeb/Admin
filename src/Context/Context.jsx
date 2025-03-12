import { useState, createContext } from "react";

const StatesContext = createContext()

const StatesProvider = ({children})=>{
    const [createdCompany, setCreatedCompany] = useState()
    const [createdAd, setCreatedAd] = useState()
    const [isDeleted, setIsDeleted] = useState()
    return(
        <StatesContext.Provider
         value={{createdCompany, setCreatedCompany ,
          createdAd, setCreatedAd, isDeleted, setIsDeleted}}>
            {children}
        </StatesContext.Provider>
    )
}
export{StatesContext, StatesProvider}
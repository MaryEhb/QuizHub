import React, { createContext, useContext, useState } from "react";
import Loading from "../components/Loading";

const LoadingContext = createContext();
const LoadingUpdateContext = createContext();

export const useLoading = () => {
    return useContext(LoadingContext);
}

export const useLoadingUpdate = () => {
    return useContext(LoadingUpdateContext);
}

export const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    
    return (
        <>
            {isLoading && <Loading />}
            <LoadingContext.Provider value={isLoading}>
                <LoadingUpdateContext.Provider value={setIsLoading}>
                    { children }
                </LoadingUpdateContext.Provider>
            </LoadingContext.Provider>
        </>
    );
}
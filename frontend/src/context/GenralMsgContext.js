import React, { createContext, useContext, useState } from 'react';
import GeneralMsg from '../components/GenralMsg';

const GeneralMsgContext = createContext();
const GeneralMsgUpdateContext = createContext();

export const useGeneralMsg = () => {
    return useContext(GeneralMsgContext);
}

export const useGeneralMsgUpdate = () => {
    return useContext(GeneralMsgUpdateContext);
}

export const GeneralMsgProvider = ({ children }) => {
    const [message, setMessage] = useState({ text: null, type: 'info' });

    const updateMessage = (text, type = 'info') => {
        setMessage({ text, type });
    };

    const exitMessage = () => {
        setMessage({ text: '', type: 'info' });
    };

    return (
        <GeneralMsgContext.Provider value={message}>
            <GeneralMsgUpdateContext.Provider value={updateMessage}>
                {message.text && <GeneralMsg message={message.text} type={message.type} handleExit={exitMessage}/>}
                {children}
            </GeneralMsgUpdateContext.Provider>
        </GeneralMsgContext.Provider>
    );
}
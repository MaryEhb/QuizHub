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

    return (
        <GeneralMsgContext.Provider value={message}>
            <GeneralMsgUpdateContext.Provider value={setMessage}>
                {message.text && <GeneralMsg message={message.text} type={message.type} />}
                {children}
            </GeneralMsgUpdateContext.Provider>
        </GeneralMsgContext.Provider>
    );
}
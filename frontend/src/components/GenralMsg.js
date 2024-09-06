import React from 'react';

const GeneralMsg = ({ message, type }) => {
    // TODO: add close btn, add timeout to disappear after a default amount of time (in future can be changed from settings)
    const getMessageStyle = () => {
        switch (type) {
            case 'success':
                return 'general-msg success';
            case 'error':
                return 'general-msg error';
            case 'info':
                return 'general-msg info';
            default:
                return 'general-msg';
        }
    };

    return (
        <div className={getMessageStyle()}>
            {message}
        </div>
    );
};

export default GeneralMsg;
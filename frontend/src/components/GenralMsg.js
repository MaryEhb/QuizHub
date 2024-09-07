import React, {useState, useEffect} from 'react';
import { FaRegWindowClose } from "react-icons/fa";

const GeneralMsg = ({ message, type, handleExit }) => {
    
    const [progress, setProgress] = useState(0);
    const timeoutDuration = 7000; // 7 seconds

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + (100 / (timeoutDuration / 100));
            });
        }, 100);

        const timeout = setTimeout(() => {
            handleExit();
        }, timeoutDuration);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(timeout);
        };
    }, [message]);

    return (
        <div className={`general-msg-container ${type}`}>
            <div className='general-msg'>
                {message}
            </div>

            <button onClick={handleExit}>
                <FaRegWindowClose />
            </button>

            <div className='progress-bar'>
                <div className='progress' style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
};

export default GeneralMsg;
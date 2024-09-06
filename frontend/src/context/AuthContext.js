import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const AuthUpdateContext = createContext();

export const useAuth = () => {
    useContext(AuthContext);
};

export const useAuthUpdate = () => {
    useContext(AuthUpdateContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateUser = (user) => {
        setUser(user);
    };

    return(
        <AuthContext.Provider value={user}>
            <AuthUpdateContext.Provider value={updateUser}>
                { children }
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
};
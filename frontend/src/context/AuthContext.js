import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth } from "../services/authService";
import { useLoadingUpdate } from "./LoadingContext";

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setLoading = useLoadingUpdate();

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);
            const { isAuthenticated, user } = await checkAuth();
            setUser(user);
            setIsAuthenticated(isAuthenticated);
            setLoading(false);
        }
        initializeAuth();
    }, []);


    const updateUser = (user) => {
        setUser(user);
    };

    return(
        <AuthContext.Provider value={{ user, isAuthenticated }}>
            <AuthUpdateContext.Provider value={updateUser}>
                { children }
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
};
import { createContext, useContext, useEffect, useState } from 'react';
import { checkAuth } from '../services/authService';
import { useLoadingUpdate } from './LoadingContext';

const AuthContext = createContext();
const AuthUpdateContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useAuthUpdate = () => {
    return useContext(AuthUpdateContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setLoading = useLoadingUpdate();

    const initializeAuth = async () => {
        setLoading(true);
        const { isAuthenticated, user } = await checkAuth();
        setUser(user);
        setIsAuthenticated(isAuthenticated);
        setLoading(false);
    };

    useEffect(() => {
        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated }}>
            <AuthUpdateContext.Provider value={initializeAuth}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
};
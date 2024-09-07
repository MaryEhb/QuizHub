import { createContext, useContext, useEffect, useState } from 'react';
import { useLoadingUpdate } from './LoadingContext';
import { checkAuth, login as loginService, logout as logoutService } from '../services/authService';

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

    const login = async (email, password, setLoginLoading) => {
        setLoginLoading(true);
        try {
            await loginService(email, password);
            await initializeAuth(); // Refresh user authentication status
        } catch (error) {
            // Handle login errors if needed
            throw error;
        } finally {
            setLoginLoading(false);
        }
    };

    const logout = () => {
        try {
            logoutService(); // Call logout service to remove token
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            // Handle logout errors if needed
            console.error('Logout error:', error);
        }
    };

    const updateUser = (user) => {
        setUser(user);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            <AuthUpdateContext.Provider value={updateUser}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
};
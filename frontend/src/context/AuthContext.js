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
    const setLoading = useLoadingUpdate();

    const initializeAuth = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000)); // TODO: remove timeput in actual production its used now to simulate the time taken to load the app
        try {
            const user = await checkAuth();
            // Set user if authenticated, otherwise null
            setUser(user);
        } catch (error) {
            console.error('Initialization error:', error);
            setUser(null); // Ensure user is set to null on error
        } finally {
            setLoading(false);
        }
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
            // Optionally handle login errors, rethrow if necessary
            throw error;
        } finally {
            setLoginLoading(false);
        }
    };

    const logout = () => {
        try {
            logoutService(); // Call logout service to remove token
            setUser(null); // Clear user state
        } catch (error) {
            // Handle logout errors if needed
            console.error('Logout error:', error);
        }
    };

    const updateUser = (user) => {
        setUser(user); // Update user state
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <AuthUpdateContext.Provider value={updateUser}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
};
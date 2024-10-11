import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the User interface
interface User {
    id: string | null;
    username: string;
    email: string;
    isAuthenticated: boolean;
    preferences?: Record<string, unknown>;
}

// Define the context value type
interface UserContextType {
    user: User;
    loginUser: (userData: Omit<User, "isAuthenticated">) => void;
    logoutUser: () => void;
}

// Create UserContext with default undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Export the UserContext itself
export { UserContext };

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

// Define the provider props type
interface UserProviderProps {
    children: ReactNode;
}

// UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>({
        id: null,
        username: "",
        email: "",
        isAuthenticated: false,
        preferences: {},
    });

    const loginUser = (userData: Omit<User, "isAuthenticated">) => {
        setUser({ ...userData, isAuthenticated: true });
    };

    const logoutUser = () => {
        setUser({
            id: null,
            username: "",
            email: "",
            isAuthenticated: false,
            preferences: {},
        });
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";
interface User {
    name: string;
    email: string;
    isAuthenticated: boolean;
    token: string;
}
interface UserContextType {
    user: User;
    loginUser: (email: string, password: string) => void;
    logoutUser: () => void;
    error: string;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export { UserContext };

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<User>(() => {
        const storedUser = window.localStorage.getItem("User");
        return storedUser
            ? JSON.parse(storedUser)
            : {
                  name: "",
                  email: "",
                  isAuthenticated: false,
                  token: "",
              };
    });
    const [error, setError] = useState("");

    const loginUser = async (email: string, password: string) => {
        try {
            const res = await fetch("http://localhost:8000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();
            const { status, data: userData } = data;

            if (status !== "success") {
                throw new Error("Invalid Email or Password");
            }
            if (userData.token) {
                if (userData.role === "ADMIN") {
                    window.localStorage.setItem(
                        "User",
                        JSON.stringify({
                            name: userData.name,
                            email: userData.email,
                            isAuthenticated: true,
                            token: userData.token,
                        })
                    );
                    document.cookie = `auth-token=${userData.token}; path=/; max-age=604800; SameSite=Strict`;
                    setUser(() => {
                        return {
                            name: userData.name,
                            email: userData.email,
                            isAuthenticated: true,
                            token: userData.token,
                        };
                    });
                } else {
                    throw new Error("Only Admins can access this application");
                }
            }

            router.push("/dashboard");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    const logoutUser = () => {
        window.localStorage.removeItem("User");
        document.cookie = "auth-token=; path=/; max-age=0; SameSite=Strict";
        setUser({
            name: "",
            email: "",
            isAuthenticated: false,
            token: "",
        });
        router.push("/");
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, error }}>
            {children}
        </UserContext.Provider>
    );
};

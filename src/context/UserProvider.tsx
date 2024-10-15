import { useRouter } from "next/navigation";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

interface User {
    name: string;
    email: string;
    isAuthenticated: boolean;
    token: string;
    image: string;
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
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        isAuthenticated: false,
        token: "",
        image: "",
    });
    const [error, setError] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const storedUser = getUserFromLocalStorage("User");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const getUserFromLocalStorage = (key: string) => {
        if (typeof window !== "undefined") {
            return window.localStorage.getItem(key);
        }
        return null;
    };

    const setUserToLocalStorage = (key: string, value: User) => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    };

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

            if (!res.ok) {
                throw new Error("Something went wrong. Please try again later");
            }

            const data = await res.json();
            const { status, data: userData } = data;

            if (status !== "success") {
                throw new Error("Invalid Email or Password");
            }
            if (userData.token) {
                if (userData.role === "ADMIN") {
                    const newUser = {
                        name: userData.name,
                        email: userData.email,
                        isAuthenticated: true,
                        token: userData.token,
                        image: userData.image,
                    };

                    setUserToLocalStorage("User", newUser);
                    document.cookie = `auth-token=${userData.token}; path=/; max-age=604800; SameSite=Strict`;
                    setUser(newUser);
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
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("User");
        }
        document.cookie = "auth-token=; path=/; max-age=0; SameSite=Strict";
        setUser({
            name: "",
            email: "",
            isAuthenticated: false,
            token: "",
            image: "",
        });
        router.push("/");
    };

    if (!isMounted) {
        return null;
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, error }}>
            {children}
        </UserContext.Provider>
    );
};

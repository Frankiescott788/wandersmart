import { User } from "@/types/types";
import axios from "axios";
import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";

interface ContextDefault {
    currentuser: User | null;
    setCurrentUser: (user: User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    isLoading: boolean;
    setIsLoading?: (isLoading: boolean) => void;
}

export const AuthContext = createContext<ContextDefault>({
    currentuser: null,
    setCurrentUser: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    isLoading: true,
    setIsLoading: () => {},
});

interface Children {
    children : ReactNode
}

export default function AuthProvider ({ children } : Children) : ReactElement {
    const [currentuser, setCurrentUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    


    useEffect(() => {
        const authenticate = async (): Promise<void> => {
            try {
                const token = localStorage.getItem("authtoken");
                if(!token) {
                    setIsAuthenticated(false);
                    return;
                }
                const user = await axios.get("https://wandersmart-9ajk.onrender.com/api/currentuser", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                if(user.status === 200) {
                    setCurrentUser(user.data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        authenticate()
    }, []);

    return (
        <AuthContext.Provider value={{ currentuser, setCurrentUser, isAuthenticated, setIsAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
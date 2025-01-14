export interface User {
    username? : string,
    email : string,
    password : string
};

export interface AuthResErrors {
    message : string
    response : {
        data : {
            err : User
        }
    }
}

export interface ContextDefault {
    currentuser: User | null;
    setCurrentUser: (user: User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}
export interface Destination {
    name: string;
    description: string;
    address: string;
    category: string;
    coordinates: [number, number];
    image: string;
}
import React from "react";
type User = {
    id: number;
    email: string;
    role: "ADMIN" | "USER";
};
type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
};
export declare function AuthProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function useAuth(): AuthContextType;
export {};

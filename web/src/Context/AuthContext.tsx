import React, { createContext, useState, useEffect, useContext } from 'react';
import * as auth  from '../services/auth';
import api from '../services/api';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<object | null>(null);

    useEffect(() => {
        const storagedUser = localStorage.getItem('@Auth:user');
        const storagedToken = localStorage.getItem('@Auth:token');

        if(storagedUser && storagedToken) {
            api.defaults.headers.authorization = `Bearer ${storagedToken}`;
            setUser(JSON.parse(storagedUser));
        }

    }, [])

    async function signIn(email: string, password: string) {
        const loginData = {
            email, 
            password
        };
        const response = await auth.default(loginData);

        setUser(response.user);

        api.defaults.headers.authorization = `Bearer ${response.token}`;

        localStorage.setItem('@Auth:user', JSON.stringify(response.user));
        localStorage.setItem('@Auth:token', response.token);
    }
    
    function signOut() {
        localStorage.clear();
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user , signIn, signOut}}>
            {children} 
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
};
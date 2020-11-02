import React, { createContext, useState } from 'react';
import * as auth  from '../services/auth';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(email: string, password: string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<object | null>(null);
     
    async function signIn(email: string, password: string) {
        const loginData = {
            email, 
            password
        };
        const response = await auth.default(loginData);

        setUser(response.user);
    }
    
    return(
        <AuthContext.Provider value={{signed: !!user, user , signIn}}>
            {children} 
        </AuthContext.Provider>
    );
};

export default AuthContext;
import React, { createContext } from 'react';

const Context = createContext({authenticated: false});

function AuthProvider({children}: any){
    return(
        <Context.Provider value={{authenticated: false}}>
            {children} 
        </Context.Provider>
    );
};

export { Context, AuthProvider};
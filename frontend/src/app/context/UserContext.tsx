'use client';
import UserHook from '@/app/hooks/userHook';
import React, { createContext, useContext } from 'react';

type UserContextType = ReturnType<typeof UserHook>;

const usersContext = createContext<UserContextType | null>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
    return (
        <usersContext.Provider value={{ ...UserHook() }}>
            {children}
        </usersContext.Provider>
    );
}

export const useUsers = () => useContext(usersContext);
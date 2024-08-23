import React, { useContext, useState } from 'react';
import { initialUserState } from '../utils/initialValues';
import { ThemeContext } from 'styled-components';

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useUser(){return useContext(UserContext)}
export function useUpdateUser(){return useContext(UserUpdateContext)}

export function UserProvider({children}) {
  const [user, setUser] = useState(initialUserState);
 
  const updateUser = item => {
    setUser({...user, ...item});
  }
  return(
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  )
}

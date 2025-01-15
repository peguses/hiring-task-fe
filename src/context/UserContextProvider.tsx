import { createContext, ReactNode, useState } from "react";

export enum Actions {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  VIEW = "VIEW",
  DELETE = "DELETE",
  MANAGE = "MANAGE",
}

export interface Permission {
  subject: string;
  actions: [Actions];
}

export interface Role {
  name: string;
  role: string;
  permissions: [Permission];
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  authProvider: string;
  role: Role;
}

export interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export interface UserProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

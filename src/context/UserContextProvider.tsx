import { createContext, ReactNode, useState } from "react";
import { requestLogin } from "../services/user.service";

export interface User {
  name: string;
  password: string;
  isAdmin?: boolean;
  token?: string;
}

export interface UserContextType {
  user: User | null;
  rejected?: boolean;
  pending?: boolean;
  fulfilled?: boolean;
  error?: string;
  submitLogin: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export interface UserProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const [pending, setPending] = useState<boolean>(false);

  const [fulfilled, setFulfilled] = useState<boolean>(false);

  const [rejected, setRejected] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const submitLogin = async (data: User) => {
    
    setPending(true);
    setFulfilled(false);
    setRejected(false);
    setError(undefined);

    try {
      const response = await requestLogin(data);
      if (response?.data) {
        setUser(response.data);
        setFulfilled(true);
      } else {
        setFulfilled(false);
        setRejected(true);
        setError("Login failed");
      }
    } catch (err: any) {
      setRejected(true);
      setError(
        err?.response?.data?.errors?.length > 0
          ? err?.response?.data?.errors[0]?.msg
          : undefined
      );
    } finally {
      setPending(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, submitLogin, logout, pending, fulfilled, rejected, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

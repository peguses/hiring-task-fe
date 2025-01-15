import { ReactNode } from "react";
// import { MenuContextProvider } from "./MenuContextProvider";
// import { ApolloContextProvider } from "./ApolloContextProvider";
import { UserContextProvider }  from "./UserContextProvider";

export interface AppProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppProviderProps> = ({
  children,
}) => {
  return (
    // <ApolloContextProvider>
      // <MenuContextProvider>
        <UserContextProvider>{children}</UserContextProvider>
      // </MenuContextProvider>
    // </ApolloContextProvider>
  );
};

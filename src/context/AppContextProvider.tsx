import { ReactNode } from "react";
// import { MenuContextProvider } from "./MenuContextProvider";
// import { ApolloContextProvider } from "./ApolloContextProvider";
import { UserContextProvider }  from "./UserContextProvider";
import { FeedbackContextProvider } from "./FeedbackContextProvider";

export interface AppProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppProviderProps> = ({
  children,
}) => {
  return (
    // <ApolloContextProvider>
      <FeedbackContextProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </FeedbackContextProvider>
    // </ApolloContextProvider>
  );
};

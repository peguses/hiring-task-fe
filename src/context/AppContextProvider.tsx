import { ReactNode } from "react";
import { UserContextProvider }  from "./UserContextProvider";
import { FeedbackContextProvider } from "./FeedbackContextProvider";
import { MenuContextProvider } from "./MenuContextProvider";

export interface AppProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppProviderProps> = ({
  children,
}) => {
  return (
    <MenuContextProvider>
      <UserContextProvider>
        <FeedbackContextProvider>
          {children}
        </FeedbackContextProvider>
      </UserContextProvider>
    </MenuContextProvider>
  );
};

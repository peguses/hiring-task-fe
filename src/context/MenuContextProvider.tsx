import { createContext, ReactNode, useState } from "react";
import { MenuEnum } from "../enums/menu.enum";

export interface Menu {
    menu: MenuEnum | undefined
}


export interface MenuContextType {
    menu: Menu | null;
    setMenu: (menu: Menu | null) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export interface MenuContextProviderProps {
  children: ReactNode;
}

export const MenuContextProvider: React.FC<MenuContextProviderProps> = ({ children }) => {
  const [menu, setMenu] = useState<Menu | null>(null);

  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
  

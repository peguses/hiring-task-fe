import { useContext } from "react";
import MenuContext, { MenuContextType } from "../context/MenuContextProvider";

export const useMenu = () : MenuContextType => {
    const context  =  useContext(MenuContext);

    if (!context) {
        throw new Error("useFeedback must be used within a MenuContextProvider")
    }
    return context;
}
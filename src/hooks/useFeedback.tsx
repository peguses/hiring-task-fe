import { useContext } from "react";
import FeedbackContext, { FeedbackContextType } from "../context/FeedbackContextProvider";

export const useFeedback = () : FeedbackContextType => {
    const context  =  useContext(FeedbackContext);

    if (!context) {
        throw new Error("useFeedback must be used within a FeedbackContextProvider")
    }
    return context;
}
import { createContext, ReactNode, useState } from "react";
import { submitFeedback } from "../services/feedback.service";

export interface Feedback {
  customerName: string;
  customerEmail: string;
  comment: string;
  sentimentScore?: number;
}

export interface FeedbackContextType {
  feedback?: Feedback | null;
  submitting?: boolean;
  error?: string;
  submit: (user: Feedback) => void;
  clear: () => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

export interface FeedbackContextProviderProps {
  children: ReactNode;
}

export const FeedbackContextProvider: React.FC<
  FeedbackContextProviderProps
> = ({ children }) => {
  const [feedback, setFeedback] = useState<Feedback | undefined>(undefined);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const submit = async (data: Feedback) => {

    setSubmitting(true);

    setError(undefined);

    try {

      const response = await submitFeedback(data);
      setFeedback(response.data);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const clear = () => {
    setFeedback(undefined);
  };

  return (
    <FeedbackContext.Provider
      value={{ feedback, submit, clear, submitting, error }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;

import { createContext, ReactNode, useState } from "react";
import { fetchFeedbacks, submitFeedback } from "../services/feedback.service";

export interface Feedback {
  customerName: string;
  customerEmail: string;
  comment: string;
  sentimentScore?: number;
}

export interface FeedbackContextType {
  feedback?: Feedback | null;
  feedbacks?: Array<Feedback> | [];
  rejected?: boolean;
  pending?: boolean;
  fulfilled?: boolean;
  error?: string;
  submit: (user: Feedback) => void;
  fetchAll: () => void;
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

  const [pending, setPending] = useState<boolean>(false);

  const [fulfilled, setFulfilled] = useState<boolean>(false);

  const [rejected, setRejected] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const submit = async (data: Feedback) => {
    setPending(true);
    setFulfilled(false);
    setRejected(false);
    setError(undefined);

    try {
      const response = await submitFeedback(data);
      setFeedback(response.data);
      setFulfilled(true);
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

  const fetchAll = async () => {
    setPending(true);
    setFulfilled(false);
    setRejected(false);
    setError(undefined);

    try {
      const response = await fetchFeedbacks();
      setFeedback(response.data);
      setFulfilled(true);
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

  const clear = () => {
    setFeedback(undefined);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        submit,
        fetchAll,
        clear,
        pending,
        fulfilled,
        rejected,
        error,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;

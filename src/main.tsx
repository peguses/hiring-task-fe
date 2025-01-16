import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Theme } from "@radix-ui/themes"
import { AppContextProvider } from "./context/AppContextProvider.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <Theme>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </Theme>
    </ChakraProvider>
  </StrictMode>
);



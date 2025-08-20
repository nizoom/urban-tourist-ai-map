import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Theme } from "@chakra-ui/react";

// import system here
import { system } from "@chakra-ui/react/preset";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <Theme bg={"black"} appearance="dark" colorPalette="black">
        <App />
      </Theme>
    </ChakraProvider>
  </StrictMode>
);

import { ColorModeProvider } from "./components/ui/color-mode";
import { Theme } from "@chakra-ui/react";
export const ForcedColorMode = ({ children }) => {
  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark">{/* Rest of the page */}</Theme>
    </ColorModeProvider>
  );
};

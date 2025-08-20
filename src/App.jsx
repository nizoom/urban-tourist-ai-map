import { useState } from "react";
import { MapComponent } from "./map/map";
import { Container, Theme, Text, Flex, Spacer } from "@chakra-ui/react";

import "./App.css";
import { PreferenceUI } from "./components/ui/preferences/preferences-modal";

function App() {
  return (
    <Theme bg={"black"} appearance="dark" colorPalette="white">
      <Flex maxW={"100%"} alignItems={"center"}>
        <Flex gap="4" justify="flex-start">
          <Text textStyle="2xl" alignSelf={"left"} p="40px">
            Urban Tourist
          </Text>
        </Flex>
        <Spacer />
        <Flex gap="4" justify="flex-start">
          <PreferenceUI />
        </Flex>
      </Flex>
      <Container bg={"black"} appearance="dark" colorPalette="white">
        <MapComponent />
      </Container>
    </Theme>
  );
}

export default App;

import { useState } from "react";
import { MapComponent } from "./map/map";
import {
  Container,
  Theme,
  Text,
  Flex,
  Spacer,
  Stack,
  Image,
  HStack,
  Button,
} from "@chakra-ui/react";
import Logo from "./assets/logo.jpeg";
import { ResultsDrawer } from "./components/ui/results/results_drawer";
import { fetchData } from "./requests";

import "./App.css";
import { PreferenceUI } from "./components/ui/preferences/preferences-modal";

function App() {
  return (
    <Theme bg={"black"} appearance="dark" colorPalette="white">
      <Flex maxW={"100%"} alignItems={"center"}>
        <Flex gap="2" justify="flex-start">
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column-reverse"}
          >
            {/* <Text textStyle="2xl" alignSelf={"left"} p="40px">
              Urban Tourist
            </Text> */}
            <Image
              src={Logo}
              boxSize="85px"
              borderRadius="full"
              fit="cover"
              alt="logo"
              m={"50px"}
              mr={"0px"}
            />
          </Stack>
        </Flex>
        <HStack>
          {Array.from({ length: 100 }).map((_, i) => (
            <Spacer key={i} />
          ))}
        </HStack>
        <Flex gap="4" justify="flex-start">
          <PreferenceUI />
          <ResultsDrawer />
        </Flex>
        <Spacer />
      </Flex>
      <Button onClick={fetchData}> Sample Fetch</Button>
      <Container bg={"black"} appearance="dark" colorPalette="white">
        <MapComponent />
      </Container>
    </Theme>
  );
}

export default App;

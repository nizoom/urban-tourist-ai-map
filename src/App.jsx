import { useState } from "react";
import { MapComponent } from "./map/map";
import { Container } from "@chakra-ui/react";

import "./App.css";

function App() {
  return (
    <Container bg={"black"}>
      <h1> Test</h1>
      <MapComponent />
    </Container>
  );
}

export default App;

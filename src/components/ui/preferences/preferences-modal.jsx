import {
  Container,
  Button,
  Dialog,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { PreferencesCheckboxes } from "./checkboxes";

export const PreferenceUI = () => {
  return (
    <Container>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant="outline" color={"white"} _hover={{ color: "black" }}>
            Preferences
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content colorPalette="teal">
              <Dialog.Header bg={"black"} color={"teal.300"}>
                <Dialog.Title>Preferences</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body bg={"black"}>
                <PreferencesCheckboxes />
              </Dialog.Body>
              <Dialog.Footer bg={"black"}>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" colorPalette="teal">
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button>Save</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Container>
  );
};

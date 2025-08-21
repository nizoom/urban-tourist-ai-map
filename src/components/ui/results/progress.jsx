import { ProgressCircle } from "@chakra-ui/react";

export const ProgressLoader = () => {
  return (
    <ProgressCircle.Root value={null} size="lg" colorPalette={"teal"}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  );
};

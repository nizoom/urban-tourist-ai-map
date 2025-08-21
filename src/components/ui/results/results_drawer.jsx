import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { ProgressLoader } from "./progress.jsx";
import { useTouristStore } from "../../../store.js";

export const ResultsDrawer = () => {
  const { drawerState, toggleDrawer, loadingState, data, error } =
    useTouristStore();
  console.log("loading state");
  console.log(loadingState);

  return (
    <Drawer.Root open={drawerState} onOpenChange={toggleDrawer}>
      <Drawer.Trigger asChild>
        <Button variant="outline" color="white" _hover={{ color: "black" }}>
          Open Drawer
        </Button>
      </Drawer.Trigger>

      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="black" color="gray.100">
            <Drawer.Header>
              <Drawer.Title>
                {loadingState
                  ? "Loading..."
                  : error
                  ? "Error"
                  : data?.location || "No data"}
              </Drawer.Title>
            </Drawer.Header>

            {loadingState ? (
              <Drawer.Body>
                <VStack>
                  <Heading>Generating your schedule...</Heading>
                  {Array.from({ length: 40 }).map((_, i) => (
                    <Spacer key={i} />
                  ))}
                  <ProgressLoader />
                </VStack>
              </Drawer.Body>
            ) : error ? (
              <Drawer.Body>
                <Text color="red.400">{error}</Text>
              </Drawer.Body>
            ) : data ? (
              <Drawer.Body>
                <VStack align="start" spacing={4}>
                  {/* Image */}
                  {data.image && (
                    <Image
                      src={data.image}
                      alt={data.location}
                      borderRadius="lg"
                      w="100%"
                      maxH="200px"
                      objectFit="cover"
                    />
                  )}

                  {/* Info Section */}
                  <Box>
                    <Heading size="sm" mb={2}>
                      About
                    </Heading>
                    <Text fontSize="sm">{data.info}</Text>
                  </Box>

                  {/* Schedule Sections */}
                  {Object.entries(data.schedule).map(
                    ([timeOfDay, activities]) => (
                      <Box key={timeOfDay} w="100%">
                        <Heading size="sm" mb={2}>
                          {timeOfDay}
                        </Heading>
                        <VStack align="start" spacing={2}>
                          {activities.map((item, idx) => (
                            <HStack key={idx} spacing={4} align="start">
                              <Text fontSize="xs" color="gray.400" w="100px">
                                {item.time}
                              </Text>
                              <Text fontSize="sm">{item.activity}</Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>
                    )
                  )}
                </VStack>
              </Drawer.Body>
            ) : (
              <Drawer.Body>
                <Text>No data available. Click on the map to generate.</Text>
              </Drawer.Body>
            )}

            <Drawer.Footer>
              <Button variant="outline" onClick={toggleDrawer}>
                Close
              </Button>
            </Drawer.Footer>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

// const processImage = () => {
//   const imgStr = data.image;
//   // Or if you want to be more explicit:
//   const base64String = fullDataUrl.replace("data:image/png;base64,", "");
//   // Then you can reconstruct it if needed:
//   const imageUrl = `data:image/png;base64,${base64String}`;
// };

// const mockData = {
//   location: "Empire State Building, 5th Avenue, New York",
//   info: "The Empire State Building is one of the most iconic skyscrapers in New York City...",
//   recommendation: [
//     "Times Square",
//     "Central Park",
//     "Brooklyn Bridge",
//     "Statue of Liberty",
//     "Museum of Modern Art",
//   ],
//   schedule: {
//     Morning: [
//       {
//         time: "9:00am - 10:00am",
//         activity: "Breakfast at Best Bagel & Coffee",
//       },
//       {
//         time: "10:30am - 12:00pm",
//         activity: "Visit the Empire State Building Observation Deck",
//       },
//     ],
//     Afternoon: [
//       {
//         time: "12:30pm - 1:30pm",
//         activity: "Lunch at Shake Shack",
//       },
//       {
//         time: "2:00pm - 4:00pm",
//         activity: "Walk around Central Park",
//       },
//     ],
//     Evening: [
//       {
//         time: "6:00pm - 7:30pm",
//         activity: "Dinner at Katz's Delicatessen",
//       },
//       {
//         time: "8:00pm - 10:00pm",
//         activity: "Watch a Broadway show",
//       },
//     ],
//   },
//   image:
//     // send full png title
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAIAAADQWCC4AA...", // base64
// };

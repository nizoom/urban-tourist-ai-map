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
  // console.log("loading state");
  // console.log(loadingState);
  console.log(data);

  return (
    <Drawer.Root open={drawerState} onOpenChange={toggleDrawer} size={"lg"}>
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
                      src={`data:image/png;base64,${data.image}`}
                      alt={data.location}
                      borderRadius="lg"
                      w="100%"
                      maxH="250px"
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

                  {Object.entries(data.schedule || {})
                    .filter(
                      ([_, activities]) =>
                        Array.isArray(activities) && activities.length > 0
                    )
                    .map(([timeOfDay, activities]) => (
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
                    ))}
                  {/* Recommendations */}
                  {data.recommendation && data.recommendation.length > 0 && (
                    <Box w="100%">
                      <Heading size="sm" mb={2}>
                        Recommendations
                      </Heading>
                      <VStack align="start" spacing={2}>
                        {[...new Set(data.recommendation)].map((rec, idx) => (
                          <Text key={idx} fontSize="sm">
                            • {rec}
                          </Text>
                        ))}
                      </VStack>
                    </Box>
                  )}
                </VStack>
              </Drawer.Body>
            ) : (
              <Drawer.Body>
                <Text>No data available. Click on the map to generate.</Text>
              </Drawer.Body>
            )}

            <Drawer.Footer>
              <Button
                variant="outline"
                color={"white"}
                _hover={{ color: "black" }}
                onClick={toggleDrawer}
              >
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

// {
//     "info": "Victoria Chambers is a building located on Paul Street, London. It is a historic building with a rich history and is now used as office space for various businesses. The building has been well-maintained and features beautiful architecture that is sure to impress visitors.\n\nThe building is situated in a prime location in London, making it easily accessible by public transportation. There are many nearby amenities such as restaurants, shops, and attractions that visitors can enjoy during their stay.\n\nThe area around Victoria Chambers is known for its vibrant atmosphere, with a mix of old and new architecture that gives it",
//     "location": "Victoria Chambers, Paul Street, London",
//     "recommendation": null,
//     "schedule": {
//         "Afternoon": [
//             {
//                 "activity": "Lunch at Dishoom",
//                 "time": "1:00pm - 2:00pm"
//             },
//             {
//                 "activity": "Explore Paul Street",
//                 "time": "2:30pm - 3:30pm"
//             }
//         ],
//         "Evening": [
//             {
//                 "activity": "Dinner at Honest Burgers",
//                 "time": "6:00pm - 7:00pm"
//             },
//             {
//                 "activity": "Drinks at The Hoxton",
//                 "time": "7:30pm - 8:30pm"
//             }
//         ],
//         "Morning": [
//             {
//                 "activity": "Breakfast at Clinton St. Baking Company",
//                 "time": "9:00am - 10:00am"
//             },
//             {
//                 "activity": "Visit Victoria Chambers",
//                 "time": "10:30am - 11:30am"
//             }
//         ]
//     }
// }

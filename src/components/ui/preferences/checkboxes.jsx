import { Box, SimpleGrid, CheckboxCard } from "@chakra-ui/react";
import {
  MdNightlife,
  MdMusicNote,
  MdShoppingBag,
  MdMuseum,
  MdRestaurant,
  MdPark,
  MdLocationCity,
  MdHotel,
} from "react-icons/md";

export const PreferencesCheckboxes = () => {
  const preferences = [
    { label: "Nightlife", icon: MdNightlife },
    { label: "Music", icon: MdMusicNote },
    { label: "Shopping", icon: MdShoppingBag },
    { label: "Museums", icon: MdMuseum },
    { label: "Foodie", icon: MdRestaurant },
    { label: "Parks", icon: MdPark },
    { label: "Landmarks", icon: MdLocationCity },
    { label: "Hotels", icon: MdHotel },
  ];

  return (
    <Box bg="black" p={4} rounded="xl">
      <SimpleGrid columns={2}>
        {preferences.map(({ label, icon: Icon }) => (
          <CheckboxCard.Root key={label} variant={"subtle"} colorPalette="teal">
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control
              p={5}
              display="flex"
              alignItems="center"
              gap={5}
              bg={"black"}
              color="gray.100"
              _hover={{ bg: "gray.700" }}
              cursor={"pointer"}
            >
              <Icon size={20} />
              <CheckboxCard.Content>
                <CheckboxCard.Label>{label}</CheckboxCard.Label>
              </CheckboxCard.Content>
              <CheckboxCard.Indicator color={"teal.500"} />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        ))}
      </SimpleGrid>
    </Box>
  );
};

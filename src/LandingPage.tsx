import { Box, Text, Heading } from "@chakra-ui/react";

export const LandingPage = () => {
  return (
    <Box
      w="100vw"
      h="100vh"
      top={0}
      left={0}
      position={"absolute"}
      backgroundImage={[
        "url('/login-1.jpg')", // for mobile
      ]}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundAttachment="fixed"
    >
      <Box textAlign="center">
        <Heading size="lg">Welcome to My Website</Heading>
        <Text fontSize="xl">Explore our services and more</Text>
      </Box>
    </Box>
  );
};

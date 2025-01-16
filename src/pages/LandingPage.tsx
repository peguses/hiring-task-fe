import { Box, Grid, GridItem, IconButton } from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { FeedbackDialog } from "../components/FeedbackDialog";
import { LoginDialog } from "../components/LoginDialog";

export const LandingPage = () => {
  return (
    <>
      <Box
        w="100vw"
        h="100vh"
        top={0}
        left={0}
        position={"absolute"}
        backgroundImage={[
          "url('/login-1.jpg')",
        ]}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundAttachment="fixed"
      >
        <Box textAlign="center">
          <Grid templateColumns="repeat(2, 1fr)" gap="6">
            <GridItem colSpan={1}>
              <IconButton
                marginTop={"50px"}
                width={"100px"}
                height={"50px"}
                color={"white.950"}
                backgroundColor={"#9c27b0"}
                opacity={0.9}
              >
                <FaComment size={70} />
              </IconButton>
            </GridItem>
            <GridItem colSpan={1}>
              <IconButton
                marginTop={"50px"}
                width={"100px"}
                height={"50px"}
                color={"white.950"}
                backgroundColor={"#9c27b0"}
                fontWeight={"700"}
                opacity={0.9}
              >
                <MdLogin size={70} />
              </IconButton>
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <FeedbackDialog />
      <LoginDialog />
    </>
  );
};

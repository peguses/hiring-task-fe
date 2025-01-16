import { Box, Grid, GridItem, IconButton } from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { FeedbackDialog } from "../components/FeedbackDialog";
import { LoginDialog } from "../components/LoginDialog";
import { useMenu } from "../hooks/useMenu";
import { MenuEnum } from "../enums/menu.enum";
import { MdDashboard } from "react-icons/md";
import { useUser } from "../hooks/useUser";
import { FeedbackViewDialog } from "../components/FeedbackViewDialog";
import { MdExitToApp } from 'react-icons/md';

export const LandingPage = () => {
  const { setMenu } = useMenu();

  const { user, logout } = useUser();

  return (
    <>
      <Box
        w="100vw"
        h="100vh"
        top={0}
        left={0}
        position={"absolute"}
        backgroundImage={["url('/login-1.jpg')"]}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundAttachment="fixed"
      >
        <Box textAlign="center">
          <Grid templateColumns="repeat(2, 1fr)" gap="6">
            <GridItem colSpan={1}>
              {user && user?.isAdmin ? (
                <IconButton
                  onClick={() => {
                    setMenu({ menu: MenuEnum.DASHBOARD });
                  }}
                  marginTop={"50px"}
                  width={"100px"}
                  height={"50px"}
                  color={"white.950"}
                  backgroundColor={"#9c27b0"}
                  opacity={0.9}
                >
                  <MdDashboard size={70} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    setMenu({ menu: MenuEnum.FEEDBACK_DIALOG });
                  }}
                  marginTop={"50px"}
                  width={"100px"}
                  height={"50px"}
                  color={"white.950"}
                  backgroundColor={"#9c27b0"}
                  opacity={0.9}
                >
                  <FaComment size={70} />
                </IconButton>
              )}
            </GridItem>
            <GridItem colSpan={1}>
              {!user ? (
                <IconButton
                  onClick={() => {
                    setMenu({ menu: MenuEnum.LOGIN_DIALOG });
                  }}
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
              ) : (
                <IconButton
                  onClick={() => {
                    logout()
                  }}
                  marginTop={"50px"}
                  width={"100px"}
                  height={"50px"}
                  color={"white.950"}
                  backgroundColor={"#9c27b0"}
                  fontWeight={"700"}
                  opacity={0.9}
                >
                  <MdExitToApp size={70} />
                </IconButton>
              )}
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <FeedbackDialog />
      <LoginDialog />
      <FeedbackViewDialog />
    </>
  );
};

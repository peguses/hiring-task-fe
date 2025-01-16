import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    HStack,
    Stack,
  } from "@chakra-ui/react";
  import { Button } from "./ui/button";
  import { MenuEnum } from "../enums/menu.enum";
  import { useMenu } from "../hooks/useMenu";
import { useFeedback } from "../hooks/useFeedback";
import { useEffect } from "react";
  
  
  export const FeedbackViewDialog = () => {

    const { menu } = useMenu();

    const { fetchAll } = useFeedback();

    useEffect(() => {
        if (menu?.menu === MenuEnum.DASHBOARD ) fetchAll();
    }, [menu])

    return (
      <HStack wrap="wrap" gap="4">
        <DialogRoot
          key={"feed_back_dialog"}
          placement={"center"}
          motionPreset="slide-in-bottom"
          open={menu?.menu === MenuEnum.DASHBOARD}
          size={"xl"}
        >
          <DialogContent>
            <DialogHeader textAlignLast={"justify"}>
              <DialogTitle>Login</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Stack gap="4" align="flex-start" w="lg">
               
              </Stack>
            </DialogBody>
            <DialogFooter>
              <Button
                onClick={() => {
                //   reset({ name: "", password: "" });
                //   setMenu({ menu: MenuEnum.FEEDBACK_DIALOG });
                }}
                _focus={{ outline: "none" }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                // onClick={handleSubmit(onSubmit)}
                _focus={{ outline: "none" }}
                backgroundColor={"#9c27b0"}
                color={"whiteAlpha.950"}
                fontWeight="700"
                variant="surface"
                // loading ={pending} loadingText="Login..."
              >
                Login
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </HStack>
    );
  };
  
import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogRoot,
    HStack,
  } from "@chakra-ui/react";
  import { Button } from "./ui/button";
  import { FaComments } from 'react-icons/fa';
  import { MdClose } from 'react-icons/md';
import { useMenu } from "../hooks/useMenu";

export interface MessageDialogProps {
  message: string;
  open: boolean
}

export const MessageDialog: React.FC<MessageDialogProps> = ({ message, open }) => {

    const { setMenu } = useMenu();

    return (
        <HStack wrap="wrap" gap="4">
          <DialogRoot
            key={"feed_back_dialog"}
            placement={"center"}
            motionPreset="slide-in-bottom"
            open={open}
            size={"lg"}
          >
            <DialogContent>
              <DialogBody>
                <FaComments/> {message}
              </DialogBody>
              <DialogFooter>
                <Button
                  onClick={() => {
                    setMenu({ menu: undefined });
                  }}
                  _focus={{ outline: "none" }}
                  backgroundColor={"#9c27b0"}
                  color={"whiteAlpha.950"}
                  fontWeight="700"
                  variant="surface"
                >
                  <MdClose />
                  Exit
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </HStack>
      );
};

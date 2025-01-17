import {
  Box,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Fieldset,
  HStack,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Field } from "./ui/field";
import { Button } from "./ui/button";
import { MenuEnum } from "../enums/menu.enum";
import { useMenu } from "../hooks/useMenu";
import { useUser } from "../hooks/useUser";
import { User } from "../context/UserContextProvider";
import { useEffect } from "react";
import { MdClose, MdLogin } from "react-icons/md";
import { Alert } from "./ui/alert";

export const LoginDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const { menu, setMenu } = useMenu();

  const { submitLogin, pending, fulfilled, rejected, error } = useUser();

  const onSubmit = (user: User) => {
    submitLogin(user);
  };

  useEffect(() => {
    if (!pending && fulfilled && !rejected && !error) {
      setMenu({ menu: MenuEnum.DASHBOARD });
    }
  }, [pending, fulfilled, rejected, error, setMenu]);

  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot
        key={"feed_back_dialog"}
        placement={"center"}
        motionPreset="slide-in-bottom"
        open={menu?.menu === MenuEnum.LOGIN_DIALOG}
        size={"xl"}
      >
        <DialogContent>
          <DialogHeader display="flex" justifyContent={"space-between"}>
            <DialogTitle>Login</DialogTitle>
            <Box display={"flex"} justifyItems={"right"}>
              <IconButton
                height={"24px"}
                width={"24px"}
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
              </IconButton>
            </Box>
          </DialogHeader>
          <DialogBody>
            {rejected && (
              <Alert
                marginTop={"10px"}
                status="error"
                title={error}
                marginBottom={"10px"}
              />
            )}
            <Stack gap="4" align="flex-start" w="lg">
              <Fieldset.Root size="lg">
                <Fieldset.Content>
                  <Field
                    label="Name"
                    invalid={!!errors.name}
                    errorText={errors.name?.message}
                    required
                  >
                    <Input
                      {...register("name", {
                        required: "Name is required",
                      })}
                    />
                  </Field>
                  <Field
                    label="Password"
                    invalid={!!errors.password}
                    errorText={errors.password?.message}
                    required
                  >
                    <Input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </Field>
                </Fieldset.Content>
              </Fieldset.Root>
            </Stack>
          </DialogBody>
          <DialogFooter>
              <Button
                onClick={handleSubmit(onSubmit)}
                _focus={{ outline: "none" }}
                backgroundColor={"#9c27b0"}
                color={"whiteAlpha.950"}
                fontWeight="700"
                variant="surface"
                loading={pending}
                loadingText="Login..."
              >
                <MdLogin />
                Login
              </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

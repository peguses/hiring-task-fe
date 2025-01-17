import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Fieldset,
  HStack,
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
import { MdLogin } from "react-icons/md";
import { FaComment } from "react-icons/fa";


export const LoginDialog = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const { menu, setMenu } = useMenu();

  const {submitLogin, pending, fulfilled, rejected, error} = useUser();

  const onSubmit = (user: User) => {
    submitLogin(user)
  }

  useEffect(() => {
      if (!pending && fulfilled && !rejected && !error) {
        setMenu({menu: MenuEnum.DASHBOARD})
      }
  }, [pending, fulfilled, rejected, error, setMenu])

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
          <DialogHeader textAlignLast={"justify"}>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <DialogBody>
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
              onClick={() => {
                reset({ name: "", password: "" });
                setMenu({ menu: MenuEnum.FEEDBACK_DIALOG });
              }}
              _focus={{ outline: "none" }}
              backgroundColor={"#9c27b0"}
              color={"whiteAlpha.950"}
              fontWeight="700"
              variant="surface"
            >
              <FaComment/>Comment
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              _focus={{ outline: "none" }}
              backgroundColor={"#9c27b0"}
              color={"whiteAlpha.950"}
              fontWeight="700"
              variant="surface"
              loading ={pending} loadingText="Login..."
            >
              <MdLogin />Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

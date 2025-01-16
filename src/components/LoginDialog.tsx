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
  
  interface Login {
    email: string;
    password: string;
  }
  
  export const LoginDialog = () => {
    const {
      register,
      formState: { errors },
    } = useForm<Login>();
  
    return (
      <HStack wrap="wrap" gap="4">
        <DialogRoot
          key={"feed_back_dialog"}
          placement={"center"}
          motionPreset="slide-in-bottom"
          open={false}
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
                      label="Email"
                      invalid={!!errors.email}
                      errorText={errors.email?.message}
                      required
                    >
                      <Input
                        {...register("email", {
                          required: "Email is required",
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
              <Button variant="outline">Cancel</Button>
              <Button
                _focus={{ outline: "none" }}
                backgroundColor={"#9c27b0"}
                color={"whiteAlpha.950"}
                fontWeight="700"
                variant="surface"
              >
                Login
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </HStack>
    );
  };
  
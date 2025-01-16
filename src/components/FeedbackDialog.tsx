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
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Field } from "./ui/field";
import { Button } from "./ui/button";
import { useFeedback } from "../hooks/useFeedback";
import { Feedback } from "../context/FeedbackContextProvider";
import { useEffect } from "react";

export const FeedbackDialog = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Feedback>();

  const { submit, fulfilled, rejected } = useFeedback();

  useEffect(() => {
    if (fulfilled && !rejected) {
      reset({
        customerEmail: "",
        customerName: "",
        comment: "",
      });
    }
  }, [fulfilled, reset, rejected]);

  const onSubmit = (data: Feedback) => {
    submit(data);
  };

  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot
        key={"feed_back_dialog"}
        placement={"center"}
        motionPreset="slide-in-bottom"
        open={true}
        size={"xl"}
      >
        <DialogContent>
          <DialogHeader textAlignLast={"justify"}>
            <DialogTitle>Feedback</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Stack gap="4" align="flex-start" w="lg">
              <Fieldset.Root size="lg">
                <Fieldset.Content>
                  <Field
                    label="Name"
                    invalid={!!errors.customerName}
                    errorText={errors.customerName?.message}
                    required
                  >
                    <Input
                      {...register("customerName", {
                        required: "Name is required",
                      })}
                    />
                  </Field>
                  <Field
                    label="Email"
                    invalid={!!errors.customerEmail}
                    errorText={errors.customerEmail?.message}
                    required
                  >
                    <Input
                      {...register("customerEmail", {
                        required: "Email is required",
                      })}
                    />
                  </Field>
                  <Field
                    label="Feedback"
                    invalid={!!errors.comment}
                    errorText={errors.comment?.message}
                    required
                  >
                    <Textarea
                      {...register("comment", {
                        required: "Comment is required",
                      })}
                    />
                  </Field>
                </Fieldset.Content>
              </Fieldset.Root>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <Button
              _focus={{ outline: "none" }}
              onClick={() =>
                reset({ customerEmail: "", customerName: "", comment: "" })
              }
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              _focus={{ outline: "none" }}
              backgroundColor={"#9c27b0"}
              color={"whiteAlpha.950"}
              fontWeight="700"
              variant="surface"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

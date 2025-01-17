import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Table,
} from "@chakra-ui/react";
import { Button } from "./ui/button";
import { MenuEnum } from "../enums/menu.enum";
import { useMenu } from "../hooks/useMenu";
import { useFeedback } from "../hooks/useFeedback";
import { useEffect, useState } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "./ui/pagination";
import PieChart from "./charts/PieChart";
import { Page } from "../context/FeedbackContextProvider";

export const FeedbackViewDialog = () => {
  const { menu } = useMenu();

  const [data, setData] = useState<number[]>([10, 20, 30, 40]);

  const { fetchAll } = useFeedback();

  const {paginatedFeedback, fulfilled, rejected} = useFeedback();

  useEffect(() => {
    if (menu?.menu === MenuEnum.DASHBOARD) fetchAll({page: 1, pageSize: 10});
  }, [menu]);

  const onPageChange = (page: Page) => {
    fetchAll({page: page.page, pageSize: page.pageSize})
  }

  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot
        key={"feed_back_dialog"}
        placement={"center"}
        motionPreset="slide-in-bottom"
        open={menu?.menu === MenuEnum.DASHBOARD}
        size={"cover"}
      >
        <DialogContent height={"850px"}>
          <DialogHeader textAlignLast={"justify"}>
            <DialogTitle>Feedbacks</DialogTitle>
          </DialogHeader>
          <DialogBody height={"100px"}>
            <Grid templateColumns="repeat(2, 1fr)" gap="6">
              <GridItem colSpan={1}>
                <Stack gap="4" align="flex-start" w="lg">
                  <Heading size="xl">Your costumer sentiments</Heading>
                  <Table.Root height={"650px"} variant="outline" striped>
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Email</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">
                          Sentiment Score
                        </Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {paginatedFeedback?.feedbacks?.length !== 0 && paginatedFeedback?.feedbacks?.map((item, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>{item.customerName}</Table.Cell>
                          <Table.Cell>{item.customerEmail}</Table.Cell>
                          <Table.Cell textAlign="end">{item.sentimentScore}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>

                  <PaginationRoot
                    count={paginatedFeedback?.totalCount || 0}
                    pageSize={paginatedFeedback?.limit}
                    defaultPage={1}
                    variant="solid"
                    onPageChange={onPageChange}
                  >
                    <HStack>
                      <PaginationPrevTrigger />
                      <PaginationItems />
                      <PaginationNextTrigger />
                    </HStack>
                  </PaginationRoot>
                </Stack>
              </GridItem>
              <GridItem colSpan={1} display={"flex"} justifyContent={"center"}>
                <PieChart data={data} />
              </GridItem>
            </Grid>
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

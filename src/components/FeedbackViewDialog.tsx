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
  IconButton,
  Stack,
  Table,
  Textarea,
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
import PieChart, { DataUnit } from "./charts/PieChart";
import { Page } from "../context/FeedbackContextProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const FeedbackViewDialog = () => {

  const { menu, setMenu } = useMenu();

  const [chart, setChart] = useState<DataUnit[]>([{
    value: 100, label: "neutral",
    color: "green"
  }]);

  const { paginatedFeedback, fetchAll, fetchStatistics, statistics, fulfilled } = useFeedback();

  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);

  const [selectedComment, setSelectedComment] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (menu?.menu === MenuEnum.DASHBOARD) { 
      fetchAll({ page: 1, pageSize: 10 }); fetchStatistics() 
    };
  }, [menu]);

  useEffect(() => {
      if (statistics && fulfilled) {
        setChart([
          {
            value: statistics.neutral,
            label: "Natural",
            color: "blue"
          },
          {
            value: statistics.negative,
            label: "Negative",
            color: "red"
          },
          {
            value: statistics.positive,
            label: "Positive",
            color: "green"
          }
        ])
      }
  }, [statistics, fulfilled])

  const onPageChange = (page: Page) => {
    fetchAll({ page: page.page, pageSize: page.pageSize });
  };

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
                        <Table.ColumnHeader>Action</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {paginatedFeedback?.feedbacks?.length !== 0 &&
                        paginatedFeedback?.feedbacks?.map((item, index) => (
                          <Table.Row key={index}>
                            <Table.Cell>{item.customerName}</Table.Cell>
                            <Table.Cell>{item.customerEmail}</Table.Cell>
                            <Table.Cell textAlign="end">
                              {item.sentimentScore}
                            </Table.Cell>
                            <Table.Cell>
                              <IconButton
                                _focus={{ outline: "none" }}
                                onClick={() => {
                                  setSelectedRow(index);
                                  setSelectedComment(item.comment);
                                }}
                                width={"24px"}
                                height={"24px"}
                                color={"#9c27b0"}
                                opacity={0.9}
                              >
                                {selectedRow === index ? (
                                  <FaEye />
                                ) : (
                                  <FaEyeSlash />
                                )}
                              </IconButton>
                            </Table.Cell>
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
                <Grid templateColumns="repeat(1, 1fr)" marginTop={"50px"}>
                  <GridItem>
                    <PieChart data={chart} />
                  </GridItem>
                  <GridItem>
                    <Textarea
                      value={selectedComment}
                      readOnly
                      overflowY="auto"
                      width={"300px"}
                      height="300px"
                    />
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
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
              Exit
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

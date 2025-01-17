import { Box } from "@chakra-ui/react";

export interface ColoredTableCellProps {
  bgColor: string;
  color: string;
  label: string | number | any;
}

export const ColoredTableCell: React.FC<ColoredTableCellProps> = ({
  label,
  color,
  bgColor,
}) => {
  return (
    <Box borderRadius={"6px"} textAlign={"center"} fontWeight={"700"} backgroundColor={bgColor} color={color}>
      {label}
    </Box>
  );
};

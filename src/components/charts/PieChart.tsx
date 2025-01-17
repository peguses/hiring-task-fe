import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export interface DataUnit {
  value: number;
  label: string;
  color: string;
}

export interface PieChartProps {
  data: DataUnit[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    if (svgRef.current) {
      d3.select(svgRef.current).selectAll("*").remove();
    }

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<DataUnit>().value((d: any) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<DataUnit>>()
      .innerRadius(0)
      .outerRadius(radius);

    svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc")
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: any) => d.data.color);

    svg
      .selectAll(".arc")
      .append("text")
      .attr("transform", (d: any) => `translate(${arc.centroid(d)})`)
      .attr("class", "text")
      .attr("fill", "white")
      .style("font-size", "16px")
      .style("font-weight", "700")
      .text((d: any) => `${d.data.value}%`);
  }, [data]);

  return (
    <Grid templateColumns="repeat(1, 1fr)" gap="1">
      <GridItem colSpan={1}>
        <svg ref={svgRef}></svg>
      </GridItem>
      <GridItem justifyContent={"center"} colSpan={4} display={"flex"}>
          {data.map((v, index) => (
            <Box key={index} alignItems={"center"} marginLeft={"20px"} display={"flex"}>
              <Box backgroundColor={v.color} height={"10px"} width={"10px"}></Box>
              <Box marginLeft={"10px"} display={"flex"}>{v.label}</Box>
            </Box>
          ))}
      </GridItem>
    </Grid>
  );
};

export default PieChart;

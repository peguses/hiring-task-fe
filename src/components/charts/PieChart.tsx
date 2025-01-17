import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface PieChartProps {
  data: number[];
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

    const pie = d3.pie<number>();

    const arc = d3
      .arc<d3.PieArcDatum<number>>()
      .innerRadius(0)
      .outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc")
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: any, i: any) => color(i));

    svg
      .selectAll(".arc")
      .append("text")
      .attr("transform", (d: any) => `translate(${arc.centroid(d)})`)
      .attr("class", "text")
      .text((d: any) => d.data);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default PieChart;

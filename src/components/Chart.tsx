import type { FC } from "react";
import { Legend, Pie, PieChart, Tooltip } from "recharts";

interface IChart {
  totalIncome: number;
  totalExpense: number;
}

interface IData {
  name: string;
  value: number;
  fill: string;
  [key: string]: string | number;
}

const Chart: FC<IChart> = ({ totalIncome, totalExpense }) => {
  const isAnimationActive = totalIncome !== 0 || totalExpense !== 0;

  const data: IData[] = [
    { name: "Income", value: totalIncome, fill: "#00C49F" },
    { name: "Expense", value: totalExpense, fill: "#d40000ff" },
  ];

  return (
    <PieChart
      style={{ width: "100%", maxWidth: "240px", maxHeight: "240px", aspectRatio: 1 }}
      responsive
      className="mx-auto my-4"
    >
      <Pie
        data={data}
        innerRadius="80%"
        outerRadius="100%"
        // Corner radius is the rounded edge of each pie slice
        cornerRadius="50%"
        fill="#88848"
        // padding angle is the gap between each pie slice
        paddingAngle={5}
        dataKey="value"
        isAnimationActive={isAnimationActive}
      />
      <Legend wrapperStyle={{ paddingTop: "25px" }} />
      <Tooltip />
    </PieChart>
  );
};

export default Chart;

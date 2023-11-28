import { Card } from "@mui/material";
import { Line } from "react-chartjs-2";
import { SuccessfulAnalysis } from "./Analyser";
import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);


export function ChartDisplay(props: { results: SuccessfulAnalysis[] }) {
  const label = Array.from(Array(props.results.length).keys());

  return (
    <Card style={{ padding: 16, flex: 1 }}>
      <Line
        datasetIdKey='id'
        data={{
          // convert array into series of ints
          labels: label,
          datasets: [{
            label: 'Runtime',
            data: props.results.map(r => r.runtime)
          },
          {
            label: 'Carbon Footprint',
            data: props.results.map(r => r.carbonFootprint)
          },
          {
            label: 'Energy Needed',
            data: props.results.map(r => r.energyNeeded)
          }],
        }}
      />
    </Card>
  );
}
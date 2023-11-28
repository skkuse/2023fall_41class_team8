import { Box, Card, Fab } from "@mui/material";
import { Line } from "react-chartjs-2";
import { SuccessfulAnalysis } from "./Analyser";
import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { Delete } from "@mui/icons-material";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);


export function ChartDisplay(props: { results: SuccessfulAnalysis[], reset: () => void }) {
  const label = Array.from(Array(props.results.length).keys());

  return (
    <Card style={{ padding: 16, flex: 1, position: 'relative' }}>
      <Line
        datasetIdKey='id'
        data={{
          labels: label,
          datasets: [{
            label: 'Runtime',
            data: props.results.map(r => r.runtime),
            borderColor: '#00BCD4',
          },
          {
            label: 'Carbon Footprint',
            data: props.results.map(r => r.carbonFootprint),
            borderColor: '#7CB342',
          },
          {
            label: 'Energy Needed',
            data: props.results.map(r => r.energyNeeded),
            borderColor: '#FDD835',
          }],
        }}
      />
      <Box style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <Fab onClick={props.reset} style={{ float: 'right' }} color="primary">
          <Delete />
        </Fab>
      </Box>

    </Card >
  );
}
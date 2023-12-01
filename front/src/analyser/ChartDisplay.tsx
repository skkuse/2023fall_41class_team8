import { Box, Card, Fab } from "@mui/material";
import { Line } from "react-chartjs-2";
import { SuccessfulAnalysis } from "./Analyser";
import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { Delete } from "@mui/icons-material";
import React from "react";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type ChartDisplayProps = { results: SuccessfulAnalysis[], reset: () => void, viewDetails: (result: SuccessfulAnalysis) => void };

const needsUpdate = (a: ChartDisplayProps, b: ChartDisplayProps) => a.results.length == b.results.length;

function ChartDisplayNoMemo(props: ChartDisplayProps) {
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
            pointRadius: 10,
            pointHoverRadius: 10
          },
          {
            label: 'Carbon Footprint',
            data: props.results.map(r => r.carbonFootprint),
            borderColor: '#7CB342',
            pointRadius: 10,
            pointHoverRadius: 10
          },
          {
            label: 'Energy Needed',
            data: props.results.map(r => r.energyNeeded),
            borderColor: '#FDD835',
            pointRadius: 10,
            pointHoverRadius: 10
          }],
        }}
        options={{
          onClick: (_, el) => {
            if (el.length == 0) return;
            props.viewDetails(props.results[el[0].index]);
          }
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

export const ChartDisplay = React.memo(ChartDisplayNoMemo, needsUpdate);
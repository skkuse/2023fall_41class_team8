import { Box, Card, Fab } from "@mui/material";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { Delete } from "@mui/icons-material";
import React from "react";
import { Sample } from "./patternDetailMockData";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type ChartDisplayProps = { results: Sample[] };

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
            data: props.results.map(r => r.time),
            borderColor: '#00BCD4',
            pointRadius: 10,
            pointHoverRadius: 10
          },
          {
            label: 'Carbon Footprint',
            data: props.results.map(r => r.carbon),
            borderColor: '#7CB342',
            pointRadius: 10,
            pointHoverRadius: 10
          },
          {
            label: 'Energy Needed',
            data: props.results.map(r => r.energy),
            borderColor: '#FDD835',
            pointRadius: 10,
            pointHoverRadius: 10
          }],
        }}
        
      />
    </Card >
  );
}

export const ChartDisplay = React.memo(ChartDisplayNoMemo, needsUpdate);

import { Box, Card, Fab } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Sample, SuccessfulAnalysis } from "./Analyser";
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

type ChartDisplayProps = {
  // interactive가 true이면 차트의 점을 클릭했을 때 viewDetails 함수 호출
  interactive: true,
  // 그래프에 표시할 데이터
  results: SuccessfulAnalysis[],
  // 초기화 버튼을 눌렀을 때 호출할 함수
  reset: () => void,
  // 차트를 클릭했을 때 호출할 함수
  viewDetails: (result: SuccessfulAnalysis) => void
} | {
  interactive: false,
  // 그래프에 표시할 데이터
  results: Sample[]
};

// 표시할 데이터 수가 바뀌었을 때 차트를 다시 그리도록 함
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
        options={{
          onClick: (_, el) => {
            if (el.length == 0) return;
            if (props.interactive) props.viewDetails(props.results[el[0].index]);
          }
        }}
      />
      {props.interactive &&
        <Box style={{ position: 'absolute', bottom: 16, right: 16 }}>
          <Fab onClick={props.reset} style={{ float: 'right' }} color="primary">
            <Delete />
          </Fab>
        </Box>
      }


    </Card >
  );
}

export const ChartDisplay = React.memo(ChartDisplayNoMemo, needsUpdate);
import { DiffEditor } from "@monaco-editor/react";
import { Box, Stack, Typography } from "@mui/material"
import { ChartDisplay } from "../analyser/ChartDisplay";
import { ExecutionData } from "./Green";

export type CodeInfo = {
  id: number | string
}

export type AnalyserList = {
  runtime: number;
  carbonFootprint: number;
  energyNeeded: number;
};

type CodeInfoProps = {
  before: ExecutionData;
  after: ExecutionData;
};

const CodeInfo = ({before, after}: CodeInfoProps) => {

  return (
    <Stack style={{ margin: "16px", display: "flex", overflowY: "scroll" }}>
      <Stack spacing={2} direction='row' style={{ height: '500px', justifyContent: "center", alignItems: "center" }}>
        <Box>
          <Typography>Code</Typography>
        </Box>
        <Box style={{ flex: 1, height: '500px' }}>
          <DiffEditor language="java" original={before.code} modified={after.code}
            theme="vs-dark" />
        </Box>
      </Stack>
      <Stack spacing={2} direction='row' style={{ height: '100px', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box>
          <Typography>Runtime</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <Typography>{before.time}</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <Typography>{after.time}</Typography>
        </Box>
      </Stack>
      <Stack spacing={2} direction='row' style={{ height: '100px', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box>
          <Typography>Carbon Footprint</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <Typography>{before.carbon}</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <Typography>{after.carbon}</Typography>
        </Box>
      </Stack>
      <Stack spacing={2} direction='row' style={{ height: '100px', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box>
          <Typography>Energe Needed</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <Typography>{before.energy}</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <Typography>{after.energy}</Typography>
        </Box>
      </Stack>
      <Stack spacing={2} direction='row' style={{ height: '200px', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box>
          <Typography>Graph</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <ChartDisplay results={before.samples} />
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <ChartDisplay results={after.samples} />
        </Box>
      </Stack>
    </Stack>
  )
}

export default CodeInfo

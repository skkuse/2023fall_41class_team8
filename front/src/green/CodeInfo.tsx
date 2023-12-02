import { DiffEditor } from "@monaco-editor/react";
import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { PatternDetailData } from "./patternDetailMockData";
import { ChartDisplay } from "../analyser/ChartDisplay";
import { Sample } from "../analyser/Analyser";

export type CodeInfo = {
  id: number | string
}

export type AnalyserList = {
  runtime: number;
  carbonFootprint: number;
  energyNeeded: number;
};

const CodeInfo = ({ id }: CodeInfo) => {
  const [prevCode, setPrevCode] = useState("");
  const [afterCode, setAfterCode] = useState("");
  const [prevRuntime, setPrevRuntime] = useState("");
  const [afterRuntime, setAfterRuntime] = useState("");
  const [prevCarbon, setPrevCarbon] = useState("");
  const [afterCarbon, setAfterCarbon] = useState("");
  const [prevEnerge, setPrevEnerge] = useState("");
  const [afterEnerge, setAfterEnerge] = useState("");

  const [results, setResults] = useState<Sample[]>([])
  const [resultsAfter, setResultsAfter] = useState<Sample[]>([])

  useEffect(() => {

    console.log(PatternDetailData[id]);

    setPrevCode(PatternDetailData[id] && PatternDetailData[id].before.code)
    setAfterCode(PatternDetailData[id] && PatternDetailData[id].after.code)

    setPrevRuntime(PatternDetailData[id] && PatternDetailData[id].before.time)
    setAfterRuntime(PatternDetailData[id] && PatternDetailData[id].after.time)

    setPrevCarbon(PatternDetailData[id] && PatternDetailData[id].before.carbon)
    setAfterCarbon(PatternDetailData[id] && PatternDetailData[id].after.carbon)

    setPrevEnerge(PatternDetailData[id] && PatternDetailData[id].before.energy)
    setAfterEnerge(PatternDetailData[id] && PatternDetailData[id].after.energy)

    setResults(PatternDetailData[id] && PatternDetailData[id].before.samples)
    setResultsAfter(PatternDetailData[id] && PatternDetailData[id].before.samples)

  }, [id])


  return (
    <Stack style={{ margin: "16px", display: "flex", overflowY: "scroll" }}>
      <Stack spacing={2} direction='row' style={{ height: '500px', justifyContent: "center", alignItems: "center" }}>
        <Box>
          <Typography>Code</Typography>
        </Box>
        <Box style={{ flex: 1, height: '500px' }}>
          <DiffEditor language="java" original={prevCode} modified={afterCode}
            theme="vs-dark" />
        </Box>
      </Stack>
      <Stack spacing={2} direction='row' style={{ height: '100px', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box>
          <Typography>Runtime</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <Typography>{prevRuntime}</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <Typography>{afterRuntime}</Typography>
        </Box>
      </Stack>
      <Stack spacing={2} direction='row' style={{ height: '100px', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box>
          <Typography>Carbon Footprint</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <Typography>{prevCarbon}</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <Typography>{afterCarbon}</Typography>
        </Box>
      </Stack>
      <Stack spacing={2} direction='row' style={{ height: '100px', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box>
          <Typography>Energe Needed</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <Typography>{prevEnerge}</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <Typography>{afterEnerge}</Typography>
        </Box>
      </Stack>
      <Stack spacing={2} direction='row' style={{ height: '200px', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box>
          <Typography>Graph</Typography>
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <ChartDisplay results={results} />
        </Box>
        <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
          <ChartDisplay results={resultsAfter} />
        </Box>
      </Stack>
    </Stack>
  )
}

export default CodeInfo

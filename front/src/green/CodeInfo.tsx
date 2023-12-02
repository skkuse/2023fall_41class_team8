import { DiffEditor } from "@monaco-editor/react";
import { Box, Grid } from "@mui/material"
import { ExecutionData } from "./GreenPatternPage";
import { ChartDisplay } from "../analyser/ChartDisplay";
import { CenteredText } from "./CenteredText";

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



const CodeInfo = ({ before, after }: CodeInfoProps) => {

  return (
    <Grid container spacing={2} style={{ height: "100%" }}>
      <Grid item xs={2}>
        <CenteredText text={"Code"} />
      </Grid>
      <Grid item xs={10}>
        <Box style={{ flex: 1, height: '500px' }}>
          <DiffEditor language="java" original={before.code} modified={after.code}
            theme="vs-dark" />
        </Box>
      </Grid>
      <Grid item xs={2}>
        <CenteredText text={"Runtime"} />
      </Grid>
      <Grid item xs={5}><CenteredText text={before.time} /></Grid>
      <Grid item xs={5}><CenteredText text={after.time} /></Grid>
      <Grid item xs={2}>
        <CenteredText text={"Carbon Footprint"} />
      </Grid>
      <Grid item xs={5}><CenteredText text={before.carbon} /></Grid>
      <Grid item xs={5}><CenteredText text={after.carbon} /></Grid>
      <Grid item xs={2}>
        <CenteredText text={"Energy Needed"} />
      </Grid>
      <Grid item xs={5}><CenteredText text={before.energy} /></Grid>
      <Grid item xs={5}><CenteredText text={after.energy} /></Grid>
      <Grid item xs={2}>
        <CenteredText text={"Graph"} />
      </Grid>
      <Grid item xs={5}><ChartDisplay interactive={false} results={before.samples} /></Grid>
      <Grid item xs={5}><ChartDisplay interactive={false} results={after.samples} /></Grid>
    </Grid>
  )
}

export default CodeInfo

import { DiffEditor } from "@monaco-editor/react";
import { Box, Grid } from "@mui/material"
import { CodePerformanceData } from "./GreenPatternPage";
import { ChartDisplay } from "../analyser/ChartDisplay";
import { CenteredText } from "./CenteredText";

// 그린 패턴 적용 전후의 코드 실행 결과를 나타내는 컴포넌트
const CodeInfo = ({ before, after }: CodePerformanceData) => {

  return (
    <Grid container spacing={2} style={{ height: "100%" }}>
      <Grid item xs={2}>
        <CenteredText text={"Code"} />
      </Grid>
      <Grid item xs={10}>
        <Box style={{ flex: 1, height: '500px' }}>
          {/* DiffEditor를 사용함으로써 두 코드의 차이를 보여줌*/}
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

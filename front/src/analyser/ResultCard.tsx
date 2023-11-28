import { Box, Card, Stack, Typography } from "@mui/material";
import { ValueDisplay } from "./ValueDisplay";
import { AnalysisResult, ErrorType } from "./Analyser";

export function ResultCard(props: { result: AnalysisResult }) {

  const valueDisplay = () => {
    if (props.result.success) {
      return (
        <>
          <ValueDisplay title='Runtime' value={props.result.runtime.toString()} helperText='TODO' />
          <ValueDisplay title='Carbon Footprint' value={props.result.carbonFootprint.toString()} helperText='TODO' />
          <ValueDisplay title='Energy Needed' value={props.result.energyNeeded.toString()} helperText='TODO' />
        </>
      );
    } else {
      const msg = {
        [ErrorType.Compile]: '컴파일 에러',
        [ErrorType.Runtime]: '런타임 에러',
        [ErrorType.Timeout]: '시간 초과'
      }
      return (
        <>
          <ValueDisplay title='Runtime' value={msg[props.result.error]} helperText='TODO' />
          <ValueDisplay title='Carbon Footprint' value={props.result.message} helperText='TODO' />
        </>
      );
    }
  }

  return (
    <Card style={{ padding: 16, flex: 1 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant='h5' textAlign='center'>실행 결과</Typography>
          <Typography variant='body1' textAlign='center'>코드 탄소 배출량 결과를 확인하세요.</Typography>
        </Box>
        {valueDisplay()}
      </Stack>
    </Card>
  );
}
import { Box, Card, Stack, Typography } from "@mui/material";
import { ValueDisplay } from "./ValueDisplay";
import { AnalysisResult, ErrorType } from "./Analyser";

export function ResultCard(props: { result: AnalysisResult | null, pending: boolean, hideTitle?: boolean }) {

  const valueDisplay = () => {
    if (!props.result) {
      return (
        <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant='h6'>실행 결과가 없습니다.</Typography>
        </Box>
      );
    }
    if (props.pending) {
      return (
        <>
          <ValueDisplay title='Runtime' value="계산중..." helperText='TODO' />
          <ValueDisplay title='Carbon Footprint' value="계산중..." helperText='TODO' />
          <ValueDisplay title='Energy Needed' value="계산중..." helperText='TODO' />
        </>
      );
    }
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
          <ValueDisplay title='Error' value={msg[props.result.error]} helperText='TODO' />
          <ValueDisplay title='Message' value={props.result.message} helperText='TODO' expand={true} />
        </>
      );
    }
  }

  return (
    <Card style={{ padding: 16, flex: 1, display: 'flex' }}>
      <Stack spacing={2} style={{ flex: 1 }}>
        {
          !(props.hideTitle) &&
          <Box>
            <Typography variant='h5' textAlign='center'>실행 결과</Typography>
            <Typography variant='body1' textAlign='center'>코드 탄소 배출량 결과를 확인하세요.</Typography>
          </Box>
        }
        {valueDisplay()}
      </Stack>

    </Card>
  );
}
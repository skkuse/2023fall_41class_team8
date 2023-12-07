import { Box, Card, Stack, Typography } from "@mui/material";
import { ValueDisplay } from "./ValueDisplay";
import { AnalysisResult, ErrorType } from "./Analyser";

// 실행 결과를 나타내는 카드 컴포넌트
// props.result가 null이면 실행 결과가 없는 것으로 간주
// props.pending이 true이면 계산 중임을 나타냄
// props.hideTitle이 true이면 제목을 숨김
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
          <ValueDisplay title='Runtime' value="계산중..." helperText='Runtime =  I.E. Walltime' />
          <ValueDisplay title='Carbon Footprint' value="계산중..." helperText='carbon footprint = energy needed * carbon intensity' />
          <ValueDisplay title='Energy Needed' value="계산중..." helperText='energy needed = runtime * (power draw for cores * usage + power draw for memory) * PUE * PSF' />
        </>
      );
    }
    if (props.result.success) {
      return (
        <>
          <ValueDisplay title='Runtime' value={props.result.time.toString()} helperText='Runtime =  CPU time + Wall time' />
          <ValueDisplay title='Carbon Footprint' value={props.result.carbon.toString()} helperText='carbon footprint = energy needed * carbon intensity' />
          <ValueDisplay title='Energy Needed' value={props.result.energy.toString()} helperText='energy needed = runtime * (power draw for cores * usage + power draw for memory) * PUE * PSF' />
        </>
      );
    } else {
      const msg = {
        [ErrorType.Compile]: '컴파일 에러',
        [ErrorType.Runtime]: '런타임 에러',
        [ErrorType.Timeout]: '시간 초과',
        [ErrorType.Server]: '서버 요청 에러',
      }
      return (
        <>
          <ValueDisplay title='Error' value={msg[props.result.error]} helperText='발생한 에러 종류' />
          <ValueDisplay title='Message' value={props.result.message} helperText='코드를 실행시 발생한 에러 메세지입니다.' expand={true} />
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

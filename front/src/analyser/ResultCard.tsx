import { Box, Card, Stack, Typography } from "@mui/material";
import { ValueDisplay } from "./ValueDisplay";

export function ResultCard() {
  return (
    <Card style={{ padding: 16, flex: 1 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant='h5' textAlign='center'>실행 결과</Typography>
          <Typography variant='body1' textAlign='center'>코드 탄소 배출량 결과를 확인하세요.</Typography>
        </Box>
        {/* <ValueDisplay title='Runtime' value='0' helperText='TODO' /> */}
      </Stack>
    </Card>
  );
}
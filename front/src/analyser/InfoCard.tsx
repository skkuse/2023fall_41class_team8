import { Card, Stack, Typography, TextField } from "@mui/material";

export function InfoCard() {
  return (
    <Card style={{ padding: 16 }}>
      <Stack spacing={2}>
        <Typography variant='h5'>코드 실행 환경 하드웨어</Typography>
        <TextField
          label="코어 모델"
          value="AMD EPYC 7702P 64-Core Processor"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <Stack spacing={2} direction='row'>
          <TextField
            label="코어 개수"
            value="4"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
          <TextField
            label="코어 타입"
            value="???????"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
        </Stack>
        <TextField
          label="RAM"
          value="8 GB"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
      </Stack>
    </Card>
  )
}
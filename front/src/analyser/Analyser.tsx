import { Box, Button, Card, Divider, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Editor from '@monaco-editor/react'

const defaultVal = `class Main {
    public static void main(String[] args) {
        System.out.println("코드를 입력하세요!");
    }
}`;

export function Analyser() {
  const [code, setCode] = useState(defaultVal);

  const sendCode = () => {
    console.log(code);
  }

  return (
    <Stack spacing={2} style={{ margin: 16 }}>
      <Stack spacing={2} direction='row'>
        <Box style={{flex: 1}}>
          <Editor height='500px' defaultLanguage='java' onChange={(v) => setCode(v ?? '')} defaultValue={defaultVal} theme="vs-dark"/>
        </Box>
        <Card style={{ padding: 16 }}>
          <Stack spacing={2}>
            <Typography variant='h6'>코드 실행 환경 하드웨어</Typography>
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
      </Stack>
      <Divider />
      <Stack spacing={2} direction='row'>
        <Button onClick={sendCode} variant='contained'>STDIN 추가하기</Button>
        <Button onClick={sendCode} variant='contained'>분석하기</Button>
      </Stack>
      <Box style={{ flex: 1 }}>

      </Box>
    </Stack>
  );
}
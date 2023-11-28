import { Box, Button, Card, Divider, Stack } from "@mui/material";
import { useState } from "react";
import Editor from '@monaco-editor/react'
import { InfoCard } from "./InfoCard";
import { ResultCard } from "./ResultCard";

const defaultVal = `class Main {
    public static void main(String[] args) {
        System.out.println("코드를 입력하세요!");
    }
}`;

export enum ErrorType {
  Runtime,
  Compile,
  Timeout
}

export type AnalysisResult = {
  success: true;
  runtime: number;
  carbonFootprint: number;
  energyNeeded: number;
  code: string;
} | {
  success: false;
  code: string;
  error: ErrorType;
  message: string;
};

export function Analyser() {
  const [code, setCode] = useState(defaultVal);
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);

  const sendCode = () => {
    setSending(true);
    console.log(code);
    setSending(false);
    setResults([{
      success: true,
      runtime: 0,
      carbonFootprint: 0,
      energyNeeded: 0,
      code: code
    }]);
  }

  return (
    <Stack spacing={2} style={{ margin: 16 }}>
      <Stack spacing={2} direction='row' style={{ height: '500px' }}>
        <Box style={{ flex: 1 }}>
          <Editor defaultLanguage='java' onChange={(v) => setCode(v ?? '')} defaultValue={defaultVal} theme="vs-dark" options={{ readOnly: sending }}/>
        </Box>
        <InfoCard />
      </Stack>
      <Divider />
      <Stack spacing={2} direction='row'>
        <Button onClick={sendCode} variant='contained' fullWidth>STDIN 추가하기</Button>
        <Button onClick={sendCode} variant='contained' fullWidth>분석하기</Button>
      </Stack>
      <Divider />
      <Stack spacing={2} direction='row' style={{ height: '500px' }}>
        <ResultCard result={results.length == 0 ? {
          success: true,
          runtime: 0,
          carbonFootprint: 0,
          energyNeeded: 0,
          code: ''
        } : results[results.length - 1]}/>
        <Card style={{ padding: 16, flex: 1 }}>
        </Card>
      </Stack>
    </Stack>
  );
}
import { Box, Button, Divider, Stack } from "@mui/material";
import { useState } from "react";
import Editor from '@monaco-editor/react'
import { InfoCard } from "./InfoCard";
import { ResultCard } from "./ResultCard";
import { ChartDisplay } from "./ChartDisplay";

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

export type SuccessfulAnalysis = {
  success: true;
  runtime: number;
  carbonFootprint: number;
  energyNeeded: number;
  code: string;
};

export type FailedAnalysis = {
  success: false;
  code: string;
  error: ErrorType;
  message: string;
};

export type AnalysisResult = SuccessfulAnalysis | FailedAnalysis;

export function Analyser() {
  const [code, setCode] = useState(defaultVal);
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);

  const sendCode = () => {
    setSending(true);
    const newResult: AnalysisResult = {
      success: true,
      runtime: Math.random() * 1000,
      carbonFootprint: Math.random() * 1000,
      energyNeeded: Math.random() * 1000,
      code: code
    };
    setSending(false);
    setResults([...results, newResult]);
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
          success: false,
          error: ErrorType.Compile,
          message: '코드를 실행해주세요.',
          code: ''
        } : results[results.length - 1]}/>
        <ChartDisplay results={results.filter(r => r.success) as SuccessfulAnalysis[]}/>
      </Stack>
    </Stack>
  );
}
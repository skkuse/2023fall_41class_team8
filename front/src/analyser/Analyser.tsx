import { Box, Button, Divider, Stack } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import Editor from '@monaco-editor/react'
import { InfoCard } from "./InfoCard";
import { ResultCard } from "./ResultCard";
import { ChartDisplay } from "./ChartDisplay";
import { StdinDialog } from "./StdinDialog";
import { ResultDialog } from "./ResultDialog";

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

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export type AnalysisResult = SuccessfulAnalysis | FailedAnalysis;

export function Analyser() {
  const [code, setCode] = useState(defaultVal);
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [stdin, setStdin] = useState<string>('');
  const [showStdin, setShowStdin] = useState(false);
  const [selected, setSelected] = useState<SuccessfulAnalysis | null>(null);

  const sendCode = async () => {
    setSending(true);
    await sleep(1000);
    const newResult: AnalysisResult = Math.random() > 0.1 ? {
      success: true,
      runtime: Math.random() * 1000,
      carbonFootprint: Math.random() * 1000,
      energyNeeded: Math.random() * 1000,
      code: code
    } : {
      success: false,
      code: code,
      error: ErrorType.Runtime,
      message: '런타임 에러'
    };
    setSending(false);
    setResults([...results, newResult]);
  }

  const reset = useCallback(() => setResults([]), []);
  const viewDetails = useCallback((result: SuccessfulAnalysis) => setSelected(result), []);
  const filtered = useMemo(() => results.filter(r => r.success) as SuccessfulAnalysis[], [results]);

  return (
    <>
      <Stack spacing={2} style={{ margin: 16 }}>
        <Stack spacing={2} direction='row' style={{ height: '500px' }}>
          <Box style={{ flex: 1 }}>
            <Editor defaultLanguage='java' onChange={(v) => setCode(v ?? '')} defaultValue={defaultVal} theme="vs-dark" options={{ readOnly: sending }} />
          </Box>
          <InfoCard />
        </Stack>
        <Divider />
        <Stack spacing={2} direction='row'>
          <Button onClick={() => setShowStdin(true)} variant='contained' fullWidth disabled={sending}>STDIN 추가하기</Button>
          <Button onClick={sendCode} variant='contained' fullWidth disabled={sending}>분석하기</Button>
        </Stack>
        <Divider />
        <Stack spacing={2} direction='row' style={{ height: '500px' }}>
          <ResultCard pending={sending} result={results.length == 0 ? null : results[results.length - 1]} />
          <ChartDisplay results={filtered} reset={reset} viewDetails={viewDetails} />
        </Stack>
      </Stack>
      <StdinDialog open={showStdin} onClose={() => setShowStdin(false)} confirm={(stdin) => {
        if (stdin !== null) setStdin(stdin);
        setShowStdin(false);
      }} default={stdin} />
      <ResultDialog onClose={() => setSelected(null)} result={selected} />
    </>
  );
}
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

export type Sample = {
  time: string;
  carbon: string;
  energy: string;
}

export type SuccessfulAnalysis = Sample & {
  success: true;
  code: string;
};

export type FailedAnalysis = {
  success: false;
  code: string;
  error: ErrorType;
  message: string;
};

interface Props {
  sending: boolean;

  setSending(value: boolean): void;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export type AnalysisResult = SuccessfulAnalysis | FailedAnalysis;

export function Analyser({ sending, setSending }: Props) {
  const [code, setCode] = useState(defaultVal);

  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [stdin, setStdin] = useState<string>('');
  const [showStdin, setShowStdin] = useState(false);
  const [selected, setSelected] = useState<SuccessfulAnalysis | null>(null);

  const sendCode = async () => {
    setSending(true);
    await sleep(1000);
    const res = await (await fetch(`/api/runjava`, {
			method: 'POST',
			body: JSON.stringify({
				code: code,
        stdin: stdin,
			}),
      headers: {
        'Content-Type': 'application/json'
      }
		})).json();
    let newRecord: AnalysisResult;
    if(res.result === 'success') {
      newRecord = {
        success: true,
        time: res.time,
        carbon: res.carbon,
        energy: res.energy,
        code: code
      };
    } else {
      const errorMap: {[k: string]: ErrorType} = {
        runtime: ErrorType.Runtime,
        compile: ErrorType.Compile,
        timeout: ErrorType.Timeout
      };
      newRecord = {
        success: false,
        code: code,
        error: errorMap[res.err_type],
        message: res.error
      };
    }
    setSending(false);
    setResults([...results, newRecord]);
  }

  const reset = useCallback(() => setResults([]), []);
  const viewDetails = useCallback((result: SuccessfulAnalysis) => setSelected(result), []);
  const filtered = useMemo(() => results.filter(r => r.success) as SuccessfulAnalysis[], [results]);

  return (
    <>
      <Stack spacing={2} style={{ margin: 16 }}>
        <Stack spacing={2} direction='row' style={{ height: '500px' }}>
          <Box style={{ flex: 1 }}>
            <Editor defaultLanguage='java' onChange={(v) => setCode(v ?? '')} defaultValue={defaultVal}
              theme="vs-dark" options={{ readOnly: sending }} />
          </Box>
          <InfoCard />
        </Stack>
        <Divider />
        <Stack spacing={2} direction='row'>
          <Button onClick={() => setShowStdin(true)} variant='contained' fullWidth disabled={sending}>STDIN
            추가하기</Button>
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
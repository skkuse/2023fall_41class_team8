import { Box, Button, Divider, Stack } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import Editor from '@monaco-editor/react'
import { InfoCard } from "./InfoCard";
import { ResultCard } from "./ResultCard";
import { ChartDisplay } from "./ChartDisplay";
import { StdinDialog } from "./StdinDialog";
import { ResultDialog } from "./ResultDialog";

// Placeholder 코드
const defaultVal = `class Main {
    public static void main(String[] args) {
        System.out.println("코드를 입력하세요!");
    }
}`;

// 에러 종류를 모은 enum
export enum ErrorType {
  // 런타임 에러
  Runtime,
  // 컴파일 에러
  Compile,
  // 실행 시간 초과
  Timeout,
  // 서버와의 통신 실패
  Server
}

// 한번 분석한 결과를 나타내는 타입
export type Sample = {
  time: string;
  carbon: string;
  energy: string;
}

// 분석 성공 시의 결과
export type SuccessfulAnalysis = Sample & {
  success: true;
  // 분석에 사용된 코드
  code: string;
};

// 분석 실패 시의 결과
export type FailedAnalysis = {
  success: false;
  code: string;
  // 에러 종류
  error: ErrorType;
  // 에러 메시지
  message: string;
};

type Props = {
  // 분석 중인지 여부
  sending: boolean;
  // 분석 중인지 여부를 설정하는 함수
  setSending(value: boolean): void;
}

// 성공한 분석 결과와 실패한 분석 결과를 합친 타입
export type AnalysisResult = SuccessfulAnalysis | FailedAnalysis;

// 코드 분석 페이지 코드
export function Analyser({ sending, setSending }: Props) {
  // 현재 입력된 코드
  const [code, setCode] = useState(defaultVal);
  // 분석 결과 목록
  const [results, setResults] = useState<AnalysisResult[]>([]);
  // STDIN으로 넣을 값
  const [stdin, setStdin] = useState<string>('');
  // STDIN 추가 다이얼로그를 보여줄지 여부
  const [showStdin, setShowStdin] = useState(false);
  // 자세히 보여줄 분석 결과
  const [selected, setSelected] = useState<SuccessfulAnalysis | null>(null);

  // 코드를 분석하기위해 서버에 요청을 보내는 함수
  const sendCode = async () => {
    setSending(true);
    let newRecord: AnalysisResult;
    try {
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
    } catch (e) {
      setSending(false);
      setResults([...results, {
        success: false,
        code: code,
        error: ErrorType.Runtime,
        message: "서버와의 통신에 실패했습니다."
      }]);
      console.log(e);
    }
  }

  // 분석 결과 목록 초기화
  const reset = useCallback(() => setResults([]), []);
  // 자세히 볼 분석 결과 설정
  const viewDetails = useCallback((result: SuccessfulAnalysis) => setSelected(result), []);
  // 성공한 분석 결과만 필터링한 배열
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
          <ChartDisplay interactive={true} results={filtered} reset={reset} viewDetails={viewDetails} />
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
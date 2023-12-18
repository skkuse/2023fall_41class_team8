import { Dialog, DialogTitle, DialogContent, Box, IconButton } from "@mui/material";
import { SuccessfulAnalysis } from "./Analyser";
import { Editor } from "@monaco-editor/react";
import { ResultCard } from "./ResultCard";
import { Close } from "@mui/icons-material";

// 그래프에서 점을 클릭했을 때 나타나는 다이얼로그
// 클릭한 점에 대응하는 코드와 실행 결과를 보여줌
// props.result가 null이면 다이얼로그를 숨김
// 창을 닫을 때 props.onClose 함수 호출
export function ResultDialog(props: { onClose: () => void, result: SuccessfulAnalysis | null }) {
  return (
    <Dialog open={props.result !== null} onClose={props.onClose} maxWidth='xl' fullWidth>
      <DialogTitle>결과 보기</DialogTitle>
      <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      <DialogContent>
        <Box style={{ height: '500px' }}>
          <Editor defaultLanguage='java' defaultValue={props.result?.code ?? ''} theme="vs-dark" options={{readOnly: true}}/>
        </Box>
        <ResultCard pending={false} result={props.result} hideTitle={true}/>
      </DialogContent>
    </Dialog>
  );
}
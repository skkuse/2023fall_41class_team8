import { Editor } from "@monaco-editor/react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import { useState } from "react";

// stdin을 입력받는 다이얼로그
// props.open이 true이면 다이얼로그를 표시
// 창을 닫을 때 props.onClose 함수 호출
// 저장 시 입력값을 props.confirm 함수에 전달
export function StdinDialog(props: { open: boolean, onClose: () => void, confirm: (stdin: string | null) => void, default: string }) {

  const [input, setInput] = useState('');

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth='xl' fullWidth>
      <DialogTitle>STDIN 설정</DialogTitle>

      <DialogContent>
        <Box style={{ height: '500px' }}>
          <Editor defaultLanguage='text' onChange={(v) => setInput(v ?? '')} defaultValue={props.default} theme="vs-dark" />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => props.confirm(null)}>취소</Button>
        <Button onClick={() => props.confirm(input)}>저장</Button>
      </DialogActions>
    </Dialog>
  )
}
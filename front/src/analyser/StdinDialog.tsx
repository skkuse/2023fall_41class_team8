import { Editor } from "@monaco-editor/react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import { useState } from "react";

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
import { Dialog, DialogTitle, DialogContent, Box, IconButton } from "@mui/material";
import { SuccessfulAnalysis } from "./Analyser";
import { Editor } from "@monaco-editor/react";
import { ResultCard } from "./ResultCard";
import { Close } from "@mui/icons-material";

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
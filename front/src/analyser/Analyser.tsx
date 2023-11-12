import { Box, Button, Card, Divider, Stack } from "@mui/material";
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
        <Editor height='500px' defaultLanguage='java' onChange={(v) => setCode(v ?? '')} defaultValue={defaultVal} />;
        <Card style={{ padding: 8 }}>
          1234
        </Card>
      </Stack>
      <Divider/>
      <Stack spacing={2} direction='row'>
        <Button onClick={sendCode} variant='contained'>STDIN 추가하기</Button>
        <Button onClick={sendCode} variant='contained'>분석하기</Button>
      </Stack>
      <Box style={{ flex: 1 }}>

      </Box>
    </Stack>
	);
}
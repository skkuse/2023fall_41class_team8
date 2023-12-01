import { Editor } from "@monaco-editor/react";
import { Box, Stack, Typography } from "@mui/material"
import { useState } from "react";

const defaultVal = `class Main {
    public static void main(String[] args) {
        System.out.println("코드를 입력하세요!");
    }
}`;

const CodeInfo = () => {
    const [prevCode, setPrevCode] = useState(defaultVal);
    const [afterCode, setAfterCode] = useState(defaultVal);

    return (
        <Stack style={{ margin: "16px", display: "flex" }}>
            <Stack spacing={2} direction='row' style={{ height: '500px', justifyContent: "center", alignItems: "center" }}>
                <Box>
                    <Typography>Code</Typography>
                </Box>
                <Box style={{ flex: 1, height: '500px' }}>
                    <Editor defaultLanguage='java' onChange={(v) => setPrevCode(v ?? '')} defaultValue={prevCode}
                        theme="vs-dark" />
                </Box>
                <Box style={{ flex: 1, height: '500px' }}>
                    <Editor defaultLanguage='java' onChange={(v) => setAfterCode(v ?? '')} defaultValue={afterCode}
                        theme="vs-dark" />
                </Box>
            </Stack>
            <Stack spacing={2} direction='row' style={{ height: '100px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box>
                    <Typography>Runtime</Typography>
                </Box>
                <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
                    <Typography>###</Typography>
                </Box>
                <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
                    <Typography>###</Typography>
                </Box>
            </Stack>
            <Stack spacing={2} direction='row' style={{ height: '100px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box>
                    <Typography>Carbon Footprint</Typography>
                </Box>
                <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
                    <Typography>###</Typography>
                </Box>
                <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
                    <Typography>###</Typography>
                </Box>
            </Stack>
            <Stack spacing={2} direction='row' style={{ height: '100px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box>
                    <Typography>Energe Needed</Typography>
                </Box>
                <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
                    <Typography>###</Typography>
                </Box>
                <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
                    <Typography>###</Typography>
                </Box>
            </Stack>
            <Stack spacing={2} direction='row' style={{ height: '200px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box>
                    <Typography>Graph</Typography>
                </Box>
                <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
                    <Typography>###</Typography>
                </Box>
                <Box style={{ flex: 1, border: "1px", borderRadius: "10px", borderColor: "black" }}>
                    <Typography>###</Typography>
                </Box>
            </Stack>
        </Stack>
    )
}

export default CodeInfo

import { DiffEditor } from "@monaco-editor/react";
import { Box, Stack, Typography } from "@mui/material"
import { useState } from "react";

const defaultVal = `import java.util.regex.Matcher;
import java.util.regex.Pattern;

class Main {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile("'(.*?)'"); // 변경된 부분
        int found = 0;
        for (int i = 0; i < 100000; i++) {
            Matcher matcher = pattern
                    .matcher("The code should be 'able to find a phrase' that is surrounded by single quotemarks.");
            if (matcher.find()) found++;
        }
        System.out.println(found);
    }
}`;

const modifiedVal = `import java.util.regex.Matcher;
import java.util.regex.Pattern;

class Main {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile("'([^']+)'"); // 변경된 부분
        int found = 0;
        for (int i = 0; i < 100000; i++) {
            Matcher matcher = pattern
                    .matcher("The code should be 'able to find a phrase' that is surrounded by single quotemarks.");
            if (matcher.find()) found++;
        }
        System.out.println(found);
    }
}   }
}`;

const CodeInfo = () => {
    const [prevCode, setPrevCode] = useState(defaultVal);
    const [afterCode, setAfterCode] = useState(modifiedVal);

    return (
        <Stack style={{ margin: "16px", display: "flex" }}>
            <Stack spacing={2} direction='row' style={{ height: '500px', justifyContent: "center", alignItems: "center" }}>
                <Box>
                    <Typography>Code</Typography>
                </Box>
                <Box style={{ flex: 1, height: '500px' }}>
                    <DiffEditor language="java" original={prevCode} modified={afterCode}
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

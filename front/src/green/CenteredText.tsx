import { Box, Typography } from "@mui/material";

// 중앙에 텍스트를 표시하는 컴포넌트
export function CenteredText(props: { text: string }) {
  return (
    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <Typography>{props.text}</Typography>
    </Box>
  );
}
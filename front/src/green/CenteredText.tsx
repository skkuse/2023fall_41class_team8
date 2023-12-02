import { Box, Typography } from "@mui/material";

export function CenteredText(props: { text: string }) {
  return (
    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <Typography>{props.text}</Typography>
    </Box>
  );
}
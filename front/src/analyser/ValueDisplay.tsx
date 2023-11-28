import { Card, Stack, Box, Typography, Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

export function ValueDisplay(props: { title: string, value: string, helperText: string, expand?: boolean }) {
  return (
    <Card style={{ padding: 16, display: 'flex', flex: props.expand ? 1 : undefined }}>
      <Stack spacing={2} direction='row' style={{ alignItems: 'center', flex: 1 }}>
        <Box flex={1} display='flex'>
          <Box flex={1}/>
          <Typography variant='h6'>{props.title}</Typography>
        </Box>
        <Tooltip title={props.helperText}>
          <InfoIcon />
        </Tooltip>
        <Box flex={2}>
          <Typography variant='h6' textAlign='center'>{props.value}</Typography>
        </Box>
      </Stack>
    </Card>
  );
}
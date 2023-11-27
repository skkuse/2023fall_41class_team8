import { Card, Stack, Box, Typography, Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

export function ValueDisplay(props: { title: string, value: string, helperText: string }) {
  return (
    <Card style={{ padding: 16, flex: 1 }}>
      <Stack spacing={2} direction='row' style={{ alignItems: 'center' }}>
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
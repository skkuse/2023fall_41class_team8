import { Box, Card, Tab, Tabs, Typography } from '@mui/material';
import { Analyser } from './analyser/Analyser';

export function App() {
  return (
    <Box sx={{ width: '100vw' }}>
      {/* <AppBar position='static'>
				<Toolbar>
					CarbonCoder
				</Toolbar>
			</AppBar> */}
      <Box style={{ display: 'flex', justifyContent: 'center', margin: 16 }}>
        <Typography variant='h1'>
          CarbonCoder
        </Typography>
      </Box>
      <Box>
        <Card style={{ margin: 16, flexDirection: 'column' }}>
          <Tabs value={0}>
            <Tab label='코드 분석' value={0} />
            <Tab label='그린 패턴 더보기' value={1} />
          </Tabs>
          <Analyser />
        </Card>
      </Box>
    </Box>
  );
}

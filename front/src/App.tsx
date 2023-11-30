import { Box, Card, Tab, Tabs, Typography } from '@mui/material';
import { Analyser } from './analyser/Analyser';
import { useState } from 'react';
import Green from './green/Green';

export function App() {
  const [tab, setTab] = useState(0)
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
          <Tabs value={tab}>
            <Tab label='코드 분석' value={0} onClick={() => setTab(0)}/>
            <Tab label='그린 패턴 더보기' value={1}  onClick={() => setTab(1)}/>
          </Tabs>
          <>
          {tab === 0 ? <Analyser /> : <Green />}
          </>
        </Card>
      </Box>
    </Box>
  );
}

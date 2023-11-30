import {Box, Card, Tab, Tabs, Typography} from '@mui/material';
import {Analyser} from './analyser/Analyser';

export function App() {
    return (
        <Box sx={{width: '100vw'}}>
            {/* <AppBar position='static'>
				<Toolbar>
					CarbonCoder
				</Toolbar>
			</AppBar> */}
            <Box style={{display: 'flex', justifyContent: 'center', margin: 16}}>
                <Typography variant='h1'>
                    CarbonCoder
                </Typography>
            </Box>
            <Box style={{display: 'flex', justifyContent: 'center', marginBottom: 24}}>
                <Typography variant='h4' style={{color: "#434D5B"}}>
                    자신의 코드를 입력하고, 코드의 탄소 배출량을 확인하세요.
                </Typography>
            </Box>
            <Box>
                <Card style={{margin: 16, flexDirection: 'column'}}>
                    <Tabs value={0}>
                        <Tab label='코드 분석' value={0}/>
                        <Tab label='그린 패턴 더보기' value={1}/>
                    </Tabs>
                    <Analyser/>
                </Card>
            </Box>
        </Box>
    );
}

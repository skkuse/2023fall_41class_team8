import {Box, Card, CircularProgress, Tab, Tabs, Typography} from '@mui/material';
import {Analyser} from './analyser/Analyser';
import {useState} from "react";
import Green from './green/Green';

export function App() {

    const [sending, setSending] = useState(false);
    const [tab, setTab] = useState(0)

    return (
        <Box sx={{width: '100vw', position: 'relative'}}>
            <Box style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                position: 'absolute',
                visibility: sending ? 'visible' : 'hidden',
                backgroundColor: '#000000',
                opacity: '0.4',
                zIndex: '10',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <CircularProgress/>
            </Box>
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
                    <Tabs value={tab}>
                        <Tab label='코드 분석' value={0} onClick={() => setTab(0)}/>
                        <Tab label='그린 패턴 더보기' value={1} onClick={() => setTab(1)}/>
                    </Tabs>
                    {
                      tab === 0 ? (<Analyser sending={sending} setSending={setSending}/>) : (<Green />)
                    }
                </Card>
            </Box>
        </Box>
    );
}

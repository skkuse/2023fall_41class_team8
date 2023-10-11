import { AppBar, Box, Card, Tab, Tabs, Toolbar } from '@mui/material';
import React from 'react';
import { Analyser } from './analyser/Analyser';

export function App() {
	return (
		<Box sx={{ width: '100vw' }}>
			<AppBar position='static'>
				<Toolbar>
					Greenify
				</Toolbar>
			</AppBar>
			<Box>
				<Card style={{ flex: 1, margin: 16 }}>
					<Tabs value={0}>
						<Tab label='Code Analysis' value={0} />
					</Tabs>
					<Analyser />
				</Card>
			</Box>
		</Box>
	);
}

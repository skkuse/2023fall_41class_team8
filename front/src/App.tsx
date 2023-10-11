import { AppBar, Box, Toolbar } from '@mui/material';
import React from 'react';

function App() {
	return (
		<Box sx={{ width: '100vw' }}>
			<AppBar position='static'>
				<Toolbar>
					Greenify
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default App;

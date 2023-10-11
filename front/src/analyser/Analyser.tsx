import { Tabs, Tab } from "@mui/material";
import React from 'react';

function Analyser() {
	return (
		<Tabs
			value={0}
			textColor='inherit'
			indicatorColor='secondary'
		>
			<Tab label='Code Analysis' value={0} />
		</Tabs>
	)
}
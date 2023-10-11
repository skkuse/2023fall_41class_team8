import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@mui/material/styles';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
});

root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);

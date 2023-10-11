import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import { createTheme } from '@mui/material/styles';

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

import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme/theme';
import DefaultPage from './Components/DefaultPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DefaultPage />
    </ThemeProvider>
  );
}

export default App;

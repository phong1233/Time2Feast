import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme/theme'
import LoginPage from './LoginPage/LoginPage'
import SignupPage from './SignupPage/SignupPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignupPage />
    </ThemeProvider>
  );
}

export default App;

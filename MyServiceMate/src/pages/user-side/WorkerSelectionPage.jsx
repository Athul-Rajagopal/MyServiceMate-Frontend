import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../theme/Theme';
import Navbar from '../../components/Navbar';
import WorkerSelection from '../../components/WorkerSelection';
import  Footer from '../../components/Footer';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor};
    color: ${theme.textColor};
    // Add more global styles as needed
  }
`;

function WorkerSelectionPage() {
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    < Navbar/>
    <div>
        <WorkerSelection/>
    </div>
    <Footer/>
    </ThemeProvider>
  )
}

export default WorkerSelectionPage
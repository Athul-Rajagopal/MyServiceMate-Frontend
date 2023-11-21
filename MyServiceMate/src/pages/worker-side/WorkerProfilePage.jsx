import React from 'react'
import { Footer, Navbar } from '../../components'
import WorkerProfile from '../../components/WorkerProfile'
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../theme/Theme';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }
`;

function WorkerProfilePage() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <Navbar />
        <div className="w-full ">
          <WorkerProfile />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default WorkerProfilePage
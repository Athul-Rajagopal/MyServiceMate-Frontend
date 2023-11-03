import React from 'react'
import { Footer, Navbar, SignIn } from '../components'
import userImage from '../assets/userImage.jpg'
import workerImage from '../assets/workerImage.jpg'
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../theme/Theme';
import { useLocation } from 'react-router-dom'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }
`;

function SigninPage() {
  const userType = new URLSearchParams(useLocation().search).get('type');
  const imageSource = userType === 'worker' ? workerImage : userImage   
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <Navbar />
        <div className='flex justify-center items-center h-[500px] mt-20'>
          <div className="max-w-screen-md w-full rounded overflow-hidden shadow-lg bg-white flex flex-col items-center">
            <div className="px-6 py-4 flex flex-col items-center">
            <img src={imageSource} alt={userType} className="w-20 h-20" />
              <div className="font-bold text-2xl mb-2">Sign In</div>
            </div>
            <SignIn />
          </div>
        </div>
        <Footer className="mt-5" />
      </div>
    </ThemeProvider>
  )
}

export default SigninPage
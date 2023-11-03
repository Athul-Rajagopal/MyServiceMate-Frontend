import React from 'react'
import { Footer, Navbar } from '../components'
import { Link } from 'react-router-dom'
import workerImage from '../assets/workerImage.jpg'
import userImage from '../assets/userImage.jpg'
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../theme/Theme'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor}; // Set the background color
    color: ${theme.textColor}; // Set the text color
    // Add more global styles as needed
  }


`;


function LandingPage() {

  return (

    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyle />
      <div>
        <Navbar />
      </div>
      <div className="mx-auto mt-20 flex justify-center gap-10">
        <div class="max-w-screen-md rounded overflow-hidden shadow-lg bg-white">
          <div class="px-6 py-4">
            <img src={workerImage} alt="Worker" className="w-20 h-20 mx-auto" />
            <div class="font-bold text-2xl mb-2">Service Provider</div>
            <p class="text-gray-700 text-lg">
              Are you a service provider? Login here!
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <Link to="Signin?type=worker">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Sign in as Worker
              </button>
            </Link>
          </div>
        </div>

        <div class="max-w-screen-md rounded overflow-hidden shadow-lg ml-2 bg-gray-100">
          <div class="px-6 py-4">
            <img src={userImage} alt="User" className="w-20 h-20 mx-auto" />
            <div class="font-bold text-2xl mb-2">Customer</div>
            <p class="text-gray-700 text-lg">
              Dear Customer, please sign in here.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <Link to="Signin?type=user">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Sign in as User
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
      </div>
    </ThemeProvider>

  )
}

export default LandingPage
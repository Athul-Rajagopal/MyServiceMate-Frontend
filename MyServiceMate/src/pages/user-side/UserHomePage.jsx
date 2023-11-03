import React from 'react'
import UserHome from '../../components/UserHome'
import { Footer, Navbar, LocationDropdown} from '../../components'
import { useParams, useNavigate } from 'react-router-dom'; 
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../theme/Theme';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor};
    color: ${theme.textColor};
    // Add more global styles as needed
  }
`;


function UserHomePage() {

  const { locationId } = useParams();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <Navbar />
        <div className="w-full p-8">
          <UserHome locationId={locationId} />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default UserHomePage
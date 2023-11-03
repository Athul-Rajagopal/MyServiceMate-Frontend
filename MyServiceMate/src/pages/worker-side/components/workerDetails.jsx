import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Footer, Navbar } from '../../../components';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';
import workerImage from '../../../assets/wokerSvg.svg';
import SlotBookingCalendar from './SlotBookingCalendar';
import SlotBooking from './SlotBooking';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.primaryColor};
    color: ${theme.textColor};
    // Add more global styles as needed
  }
`;

function WorkerDetails() {

    const { workerId } = useParams();
    const location = useLocation();
    const selectedWorker = location.state.selectedWorker;  
    const [isBookingVisible, setIsBookingVisible] = useState(false);
    
    const handleBookNowClick = () => {
        setIsBookingVisible(true);
      };

  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    <>
        <Navbar />
        <div className="container mx-auto p-4">
        <div className="mt-4">
            {isBookingVisible && (
                <SlotBooking workerId={workerId} />
            )}
        </div>
        {!isBookingVisible ? (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  className="w-24 h-24 rounded-full"
                  src={workerImage}
                  alt={selectedWorker.worker_name}
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedWorker.worker_name}</h2>
                </div>
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
              onClick={handleBookNowClick}>
                Book Now
              </button>
            </div>
            <div className="mt-4">
              <SlotBookingCalendar Id={workerId} />
            </div>
            <div className="fixed bottom-8 right-8">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full">
                Chat
              </button>
            </div>
          </div>
          ) : null}
          {!isBookingVisible ? (
          <div className="mt-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">Reviews</h3>
              {/* Add a section to display reviews here */}
            </div>
          </div>
        ) : null}
        </div>
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default WorkerDetails;
import React,{useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Footer, Navbar } from '../../../components';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../../../theme/Theme';
import workerImage from '../../../assets/wokerSvg.svg';
import SlotBookingCalendar from './SlotBookingCalendar';
import SlotBooking from './SlotBooking';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../redux/AuthSlice';
import AxiosInstance from '../../../axios/axiosInstance';
import userImage from '../../../assets/userImage.jpg'

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
    const [reviews, setReviews] = useState([]); 
    const [isBookingVisible, setIsBookingVisible] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const userData = useSelector(selectUserData)
    const {accessToken,userId} = userData
    const navigate = useNavigate()
    const axiosInstance = AxiosInstance(accessToken)

    useEffect(()=>{

      axiosInstance.get(`/reviews/${workerId}/`)
      .then((response) => {
        // Set the reviews data in the state
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
    },[workerId])
    
    const handleBookNowClick = () => {
        setIsBookingVisible(true);
      };

    const SetChatFunction = (userId,workerId) =>{
      navigate(`/app/chat/${userId}/${workerId}`)
    }

    const handleReviewTextChange = (e) => {
      setReviewText(e.target.value);
    };

    const handleAddReviewClick = () => {
    
      // Send a POST request to your Django backend to check for bookings
      axiosInstance
        .post('/check-permission-to-review/', { 'user_id':userId, 'worker_id':workerId })
        .then((response) => {
          // Handle the response from the backend
          if (response.status === 200) {
            // User has made bookings, open the review modal
            setIsReviewModalOpen(true);
          } else {
            // User hasn't made bookings, show a message
            alert('You must make bookings to add a review.');
          }
        })
        .catch((error) => {
          // Handle errors, e.g., network issues or server errors
          console.error('Error checking permission to review:', error);
        });
    };

    const handleSubmitReview = () => {
      // Prepare the review data
      const reviewData = {
        'worker_id': workerId,
        'comment': reviewText,
      };
  
      // Send a POST request to submit the review
      axiosInstance
        .post('/add-review/', reviewData)
        .then((response) => {
          // Handle the response from the backend (e.g., show a success message)
          alert('Review submitted successfully');
          // Optionally, close the modal or clear the review text
          setIsReviewModalOpen(false);
          setReviewText('');
        })
        .catch((error) => {
          // Handle errors, e.g., network issues or server errors
          console.error('Error submitting review:', error);
        });
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
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mt-4"
              onClick={handleAddReviewClick}>
                add a review
              </button>
            </div>
            <div className="fixed bottom-8 right-8">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full"
              onClick={()=>SetChatFunction(userId,workerId)}>
                Chat
              </button>
            </div>
          </div>
          ) : null}
          {!isBookingVisible ? (
            <div className="mt-4">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">Reviews</h3>
                <div className="max-h-60 overflow-y-auto">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b py-4">
                    <div className='flex'>
                      <img src={userImage} alt="" className='h-[50px] w-[50px]' />
                      <p className="font-bold mt-2">{review.username} on {review.date}</p>
                    </div>
                    <p className='italic ml-3'>{review.comment}</p>
                    
                  </div>
                ))}
              </div>
              </div>
            </div>
          ) : null}
        </div>
        
        {isReviewModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-container bg-white w-96 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold">Add a Review</h3>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg mt-4"
                placeholder="Write your review here"
                rows="4"
                value={reviewText}
                onChange={handleReviewTextChange}
              ></textarea>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mt-4"
                onClick={handleSubmitReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        )}
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default WorkerDetails;
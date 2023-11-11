import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../axios/axiosInstance';
import { selectUserData } from '../../../redux/AuthSlice';
import { useSelector } from 'react-redux';
import userImage from '../../../assets/userImage.jpg'
import { useParams } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

function WorkerReviews() {
  const [reviews, setReviews] = useState([]);
  const userData = useSelector(selectUserData)
  const {accessToken}=userData
  const axiosInstance = AxiosInstance(accessToken)
  const {workerId} = useParams()

  console.log(workerId)

  useEffect(() => {
    axiosInstance
      .get(`/reviews/${workerId}/`)
      .then((response) => {
        // Set the reviews data in the state
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [workerId]);

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow mt-4 ml-5">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Reviews</h3>
            <div className="max-h-60 overflow-y-auto">
              {reviews.map((review) => (
                <div key={review.id} className="border-b py-4">
                  <div className="flex">
                    <img src={userImage} alt="" className="h-16 w-16 rounded-full" />
                    <div className="ml-3">
                      <p className="font-bold">{review.username} on {review.date}</p>
                      <p className="italic">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkerReviews;

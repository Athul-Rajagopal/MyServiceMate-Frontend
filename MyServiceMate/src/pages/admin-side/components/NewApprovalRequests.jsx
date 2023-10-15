import React, {useState} from 'react'
import { useEffect } from 'react';
import AxiosInstance from '../../../axios/axiosInstance';
import { selectUserData } from '../../../redux/AuthSlice';
import { useSelector } from 'react-redux';

function NewApprovalRequests() {
    const [approvalRequests, setApprovalRequests] = useState([]);
    const userData = useSelector(selectUserData)
    const {accessToken} = userData
    const axiosInstance = AxiosInstance(accessToken)

    useEffect(() => {
        // Make an API request to fetch worker approval requests
        axiosInstance
          .get('worker-approval-requests/')
          .then((response) => {
            if (Array.isArray(response.data.data)) {
            setApprovalRequests(response.data.data);
          } else {
            console.error('API response is not an array:', response.data);
          }
          })
          .catch((error) => {
            console.error('Error fetching approval requests:', error);
          });
      }, []);

      const handleApproveWorker = (workerId) => {
        // Send a PATCH request to update the worker's approval status
        axiosInstance
          .patch(`worker-approval/${workerId}/`, { is_approved: true })
          .then((response) => {
            // Check the response to make sure the worker was updated
            if (response.status === 200) {
              // If the worker was successfully updated, update the local state to reflect the change
              setApprovalRequests((prevApprovalRequests) =>
            prevApprovalRequests.filter((worker) => worker.id !== workerId)
          );
              console.log(`Worker with ID ${workerId} has been approved.`);
            } else {
              console.error('Worker approval failed:', response.data);
            }
          })
          .catch((error) => {
            console.error('Error approving worker:', error);
          });
      };
      
      return (
        <div className='flex justify-center mt-4 gap-2'>
        {approvalRequests.map((worker) => (
          <div key={worker.id} className="w-full max-w-2xl overflow-hidden rounded-lg shadow-lg mb-4 p-4 bg-blue-100">
            <div className='w-16 h-16 m-6'>
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z" fill="#323232"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z" fill="#323232"/>
              </svg>
            </div>
            <div className="px-6">
              <h4 className="mb-3 text-xl font-semibold tracking-tight text-gray-800">{worker.username}</h4>
              <p className="leading-normal text-gray-700">
                Phone Number: {worker.phone}
                <br />
                Location: {worker.location}
                <br />
                Services Selected: {worker.expertise?.map((service) => (
                  <span key={service.id}>{service.services}, </span>
                )) || 'No services selected'}
              </p>
              <button onClick={() => handleApproveWorker(worker.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
      

  );
}      

export default NewApprovalRequests
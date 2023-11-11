import React, {useState} from 'react'
import { useEffect } from 'react';
import AxiosInstance from '../../../axios/axiosInstance';
import { selectUserData } from '../../../redux/AuthSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function WorkerList() {
    const [approvalRequests, setApprovalRequests] = useState([]);
    const userData = useSelector(selectUserData)
    const {accessToken} = userData
    const axiosInstance = AxiosInstance(accessToken)
    const navigate = useNavigate()

    console.log(approvalRequests)

    useEffect(() => {
        // Make an API request to fetch worker approval requests
        axiosInstance
          .get('workers/')
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

    const [searchTerm, setSearchTerm] = useState('');

    const filteredWorkers = approvalRequests.filter((worker) =>
    // Filter workers based on the search term
    worker.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.expertise.some((service) => service.services.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const blockUser = (username) => {
    axiosInstance
      .put(`block-unblock-user/${username}/`)  // Updated to use username
      .then((response) => {
        const updatedUsers = [...approvalRequests];
        const userIndex = updatedUsers.findIndex((user) => user.username === username);
        if (userIndex !== -1) {
          updatedUsers[userIndex].is_active = !updatedUsers[userIndex].is_active;
          setApprovalRequests(updatedUsers);
        }
      })
      .catch((error) => {
        console.error('Error blocking/unblocking user:', error);
      });
  };

  const handleBookingclick = (workerId) =>{
    navigate(`/worker-bookings/${workerId}`)
  }

  const handleReviewClick = (workerId)=>{
    console.log(workerId)
    navigate(`/worker-reviews/${workerId}`)
  }




      return (
        <div className="ml-[200px] mt-5 h-[600px] overflow-y-auto w-[800px]">
            <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Services Selected
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Map your worker list here */}
          {filteredWorkers.map((worker) => (
            <tr key={worker.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{worker.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{worker.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{worker.location}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {worker.expertise?.map((service) => (
                    <span key={service.id}>{service.services}, </span>
                  )) || 'No services selected'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {/* Add action buttons here */}
                <button className="text-indigo-600 hover:text-indigo-900" onClick={()=>handleBookingclick(worker.id)} >Bookings</button>
                <button className="text-indigo-600 hover:text-indigo-900 ml-3" onClick={()=>handleReviewClick(worker.id)}>Reviews</button>
                <button className="text-red-600 hover:text-red-900 ml-3" onClick={() => blockUser(worker.username)}>{worker.is_active ? 'Block' : 'Unblock'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default WorkerList
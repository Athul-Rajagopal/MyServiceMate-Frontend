import React, {useState} from 'react'
import { useEffect } from 'react';
import AxiosInstance from '../../../axios/axiosInstance';
import { selectUserData } from '../../../redux/AuthSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserList() {
    const [approvalRequests, setApprovalRequests] = useState([]);
    const userData = useSelector(selectUserData)
    const {accessToken} = userData
    const axiosInstance = AxiosInstance(accessToken)
    const navigate = useNavigate()
    console.log(approvalRequests)

    useEffect(() => {
        // Make an API request to fetch worker approval requests
        axiosInstance
          .get('users/')
          .then((response) => {
            
            setApprovalRequests(response.data);
         
          })
          .catch((error) => {
            console.error('Error fetching approval requests:', error);
          });
      }, []);

      const [searchTerm, setSearchTerm] = useState('');

    const filteredWorkers = approvalRequests.filter((user) =>
    // Filter workers based on the search term
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleUserBookings = (username) => {
    navigate(`/user-bookings/${username}/`);
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
          Is worker
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Action
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* Map your worker list here */}
      {filteredWorkers.map((user) => (
        <tr key={user.id}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{user.username}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{user.is_worker ? 'Yes' : 'No'}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {/* Add action buttons here */}
            <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleUserBookings(user.username)}>Bookings</button>
            <button className="text-red-600 hover:text-red-900 ml-3" onClick={() => blockUser(user.username)}>{user.is_active ? 'Block' : 'Unblock'}</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);
}

export default UserList
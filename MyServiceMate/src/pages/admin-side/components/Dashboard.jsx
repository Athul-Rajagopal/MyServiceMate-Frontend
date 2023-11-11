import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../../axios/axiosInstance';
import { Line } from 'react-chartjs-2';
import { selectUserData } from '../../../redux/AuthSlice';
import { useSelector } from 'react-redux';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';


const graphStyles = {
    width: '70%', // Adjust the width as needed
    height: '400px', // Adjust the height as needed
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

function Dashboard() {
    const [bookingData, setBookingData] = useState({});
    const [serviceData, setServiceData] = useState({});
    const userData = useSelector(selectUserData);
    const { accessToken } = userData;
    const axiosInstance = AxiosInstance(accessToken);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    useEffect(() => {
        // Fetch booking statistics data from the backend API
        axiosInstance.get('/booking-statistics/')
            .then((response) => {
                // Process the data and set it in the state
                setBookingData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching booking statistics:', error);
            });

        // Fetch service data from the backend API
        axiosInstance.get('/service-statistics/')
            .then((response) => {
                // Process the data and set it in the state
                setServiceData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching service statistics:', error);
            });
    }, []);

    const fetchData = () => {
        if (fromDate && toDate) {
          axiosInstance
            .get(`/booking-statistics/?from_date=${fromDate}&to_date=${toDate}`)
            .then((response) => {
              setBookingData(response.data);
            })
            .catch((error) => {
              console.error('Error fetching booking statistics:', error);
            });
        }
      };

    // Define chart data and options
    const chartData = {
        labels: bookingData.labels,
        datasets: [
            {
                label: 'Bookings Over Time',
                data: bookingData.bookings,
                fill: false,
                borderColor: 'blue',
            },
        ],
    };

    const pieChartData = {
        labels: serviceData.labels,
        datasets: [
            {
                data: serviceData.servicesCount,
                backgroundColor: [
                    'red',
                    'blue',
                    'green',
                    'orange',
                    'purple',
                    'cyan',
                ],
            },
        ],
    };

    const pieChartOptions = {};

    const chartOptions = {};

    return (
        <>
        <div className='flex w-full mt-5 ml-5'>
          <div style={graphStyles} className='flex-grow w-[600px]'>
            <h2>Booking Statistics Over Time</h2>
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className='w-[300px] border-solid border-2 h-[400px] shadow-sm ml-2'>
            <h2>Services Provided</h2>
            <Doughnut data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
        <div className='flex mt-4 flex-col'>
          <label>From Date</label>
          <input
            type='date'
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label>To Date</label>
          <input
            type='date'
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button
            onClick={fetchData}
            className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'
          >
            Apply Filter
          </button>
        </div>
      </>
      
    );
}

export default Dashboard;

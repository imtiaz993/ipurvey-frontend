import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../Context/authContext';
import { API_URL } from '../../../Utils/constants';
import axios from 'axios';

const GroupedBar = () => {
 const { user } = useAuthContext();
 const [datasets, setDatasets] = useState({
  requestedClaims: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  totalBookings: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 });
 const getChartData = async () => {
  const currentdate = new Date();
  const endOfYear = currentdate.getFullYear() + '-12-31';
  const startOfYear = currentdate.getFullYear() + '-01-01';
  const response = await axios.get(`${API_URL.DCR}/api/travel-bookings/graph`, {
   params: {
    dateCreatedFrom: startOfYear,
    dateCreatedTo: endOfYear,
   },
   headers: {
    Authorization: user.customerNumber,
    'Content-Type': 'application/json',
   },
  });
  const data = response.data;
  const requestedClaims = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const totalBookings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  data.requestedClaims.forEach((claims) => {
   requestedClaims[claims.month - 1] = claims.requestedClaims;
  });
  data.totalBookings.forEach((booking) => {
   totalBookings[booking.month - 1] = booking.totalBookings;
  });
  setDatasets({ requestedClaims, totalBookings });
 };

 useEffect(() => {
  if (user?.isAuthenticated) getChartData();
 }, []);

 const data = {
  labels: [
   'Jan',
   'Feb',
   'March',
   'April',
   'May',
   'June',
   'July',
   'Aug',
   'Sep',
   'Oct',
   'Nov',
   'Dec',
  ],
  datasets: [
   {
    label: 'No. of Travel Bookings',
    data: datasets.totalBookings,
    backgroundColor: '#1F78B4',
   },
   {
    label: 'No. of Requested Claims',
    data: datasets.requestedClaims,
    backgroundColor: '#73E9CC',
   },
  ],
 };

 const options = {
  scales: {
   x: {
    grid: {
     display: false,
    },
   },
   y: {
    grid: {
     display: false,
     drawBorder: false,
     lineWidth: 0.5,
    },
    ticks: {
     display: false,
    },
   },
  },
  responsive: true,
  plugins: {
   legend: {
    position: 'top',
   },
  },
 };
 return <Bar data={data} options={options} className='cus_bar_chart' />;
};

export default GroupedBar;

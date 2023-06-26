import { TextField, CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import filter from '../../../Assets/Group 3570.png';
import Loader from '../../../Components/Loader';
import { useAuthContext } from '../../../Context/authContext';
import { dashboard } from '../../../Query/queryFunctions';
import { API_URL } from '../../../Utils/constants';
import BackHeader from '../BackHeader';
import FilterDropDown from '../FilterDropDown';
import MiniDrawer from '../Sidebar';
import MobViewDetailCard from './MobViewDetailCard';
import './style.css';
import Table from './Table';

const TravelBooking = () => {
 const [reset, setReset] = useState(false);
 const [showFilterDrp, setShowFilterDrp] = useState(false);
 const [bookingInfo, setBookingInfo] = useState();
 const [bookingReference, setBookingReference] = useState();
 const [isBookingLoading, setIsBookingLoading] = useState(false);
 const [details, setDetails] = useState({
  from: undefined,
  to: undefined,
 });
 const { data } = useQuery('dashboard', dashboard, {
  refetchOnWindowFocus: false,
 });
 const { user } = useAuthContext();
 const updateBooking = (data) => {
  setReset(true);
  setBookingInfo(data);
  setShowFilterDrp(false);
 };
 const getAirPortsList = async () => {
  const URL = `${API_URL.RDS}/referencedata/airport-details`;
  const response = await axios.get(URL, {
   auth: {
    username: 'admin',
    password: 'Admin#$5',
   },
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'Access-Control-Allow-Credentials': 'true',
   },
  });
  return response?.data;
 };
 const { isLoading, data: airport } = useQuery('airports', getAirPortsList, {
  refetchOnWindowFocus: false,
 });
 const getData = async () => {
  const response = await axios.get(`${API_URL.DCR}/api/travel-bookings`, {
   headers: {
    Authorization: user.customerNumber,
    'Content-Type': 'application/json',
   },
  });
  setBookingInfo(response.data);
 };

 const onSearch = async (e) => {
  e.preventDefault();
  setIsBookingLoading(true);
  const response = await axios.get(`${API_URL.DCR}/api/travel-bookings`, {
   headers: {
    Authorization: user.customerNumber,
    'Content-Type': 'application/json',
   },
   params: {
    bookingReference,
    travelDetailsFrom: details.from ? details.from.airport : '',
    travelDetailsTo: details.to ? details.to.airport : '',
    travelMode: '',
   },
  });
  updateBooking(response.data);
  setIsBookingLoading(false);
 };

 useEffect(() => {
  if (user?.customerNumber !== undefined) getData();
 }, [user]);

 if (data) {
  return (
   <div className='tb_page_container'>
    <div className='tb_page_md'>
     <div className='tb_page_sd w-100'>
      <div className='db_left_content'>
       <MiniDrawer />
      </div>
      <div className='tb_page_right_md'>
       <div className='tb_page_rigth_content'>
        <BackHeader head={data?.search_travel} link='/dashboard' />
        <h5>{data?.search_travel_bookings}</h5>
        {isBookingLoading || isLoading ? (
         <div className='d-flex mt-5 justify-content-center'>
          <CircularProgress />
         </div>
        ) : (
         <>
          <div className='tb_search_md'>
           <form onSubmit={onSearch}>
            <input
             type='text'
             className='cus_inp'
             placeholder='Booking Reference'
             value={bookingReference}
             onChange={(evt) => setBookingReference(evt.target.value)}
             disabled={isLoading || isBookingLoading}
            />
            <div>
             <Autocomplete
              id='also-gotW'
              className='cus_select'
              key={Math.random()}
              options={airport}
              getOptionLabel={(option) => option.airport}
              disabled={isLoading || isBookingLoading}
              value={details?.from}
              onChange={(_, newValue) =>
               setDetails({ to: details.to, from: newValue })
              }
              renderInput={(params) => (
               <TextField
                type='text'
                placeholder='Departure Airport'
                {...params}
               />
              )}
             />
             <Autocomplete
              id='also-gotW'
              className='cus_select'
              key={Math.random()}
              options={airport}
              getOptionLabel={(option) => option.airport}
              disabled={isLoading || isBookingLoading}
              value={details?.to}
              onChange={(_, newValue) =>
               setDetails({ to: newValue, from: details.from })
              }
              renderInput={(params) => (
               <TextField
                type='text'
                placeholder='Arival Airport'
                {...params}
               />
              )}
             />
            </div>
            <button className='cus_blue_btn' type='submit'>
             Search
            </button>
           </form>
          </div>
          <div className='filter_container'>
           <div className='filter_img_md'>
            <div
             className='d-flex align-items-center'
             onClick={() => setShowFilterDrp(!showFilterDrp)}
            >
             <img src={filter} alt='...' />
             <p style={{ marginBottom: '0', marginLeft: '10px' }}>
              {reset ? 'Reset Filters' : 'Advanced Filters'}
             </p>
            </div>
            {showFilterDrp && (
             <FilterDropDown
              updateContent={updateBooking}
              airport={airport}
              isLoading={isLoading}
             />
            )}
           </div>
          </div>
          <div className='travel_table_container'>
           <Table tbclassName='tb_page_table' data={bookingInfo?.content} />
          </div>
          <div className='mob_view_taravel_card'>
           <MobViewDetailCard />
          </div>
          <div className='result_per_page'>
           <p>Results per page</p>
           <div className='result_count'>
            <p>{bookingInfo?.totalPages}</p>
            <div className='rp_btn'>
             <button>+</button>
             <button>-</button>
            </div>
           </div>
          </div>
         </>
        )}
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 } else return <Loader />;
};
export default TravelBooking;

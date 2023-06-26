import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { API_URL } from '../../../Utils/constants';
import { Link, useHistory } from 'react-router-dom';
import MiniDrawer from '../Sidebar';
import Table from './Table';
import GroupedBar from './BarChart';
import './style.css';
import arrow from '../../../Assets/Icon feather-arrow-right.png';
import BookingStatus from './BookingStatus';
import { useAuthContext } from '../../../Context/authContext';
import MobViewBookingCard from './MobViewBookingCard';
import { useQuery } from 'react-query';
import { dashboard } from '../../../Query/queryFunctions';
import Loader from '../../../Components/Loader';

const DashBoard = () => {
 const { user } = useAuthContext();
 const [bookingInfo, setBookingInfo] = useState();
 const history = useHistory();
 const [selected, setSelected] = useState();
 const { data } = useQuery('dashboard', dashboard, {
  refetchOnWindowFocus: false,
 });
 const graph = useMemo(() => <GroupedBar />, [user]);
 const getData = async () => {
  const response = await axios.get(`${API_URL.DCR}/api/travel-bookings`, {
   params: {
    size: 5,
   },
   headers: {
    Authorization: user.customerNumber,
    'Content-Type': 'application/json',
   },
  });
  setBookingInfo(response.data.content);
  if (response.data.content.length > 0)
   setSelected(response.data.content[0].id);
 };

 useEffect(() => {
  if (user?.isAuthenticated == true) {
   getData();
  } else {
   history.push('/user-address');
  }
 }, [user]);

 if (data && bookingInfo) {
  return (
   <div className='db_container'>
    <div className='db_md_main'>
     <div className='db_left_content'>
      <MiniDrawer />
     </div>
     <div className='db_right_content_md'>
      <div className='db_head_btn'>
       <Link to='/'>
        <button className='cus_blue_btn'>{data?.submit_new_travel}</button>
       </Link>
      </div>
      <div className='db_right_sd'>
       <div className='db_chart_table_section'>
        <div className='db_table_md'>
         <div>
          <div className='db_table_head'>
           <h4>{data?.travel_bookings}</h4>
          </div>
          {graph}
         </div>
        </div>
        <div className='db_table_md'>
         <div>
          <div className='db_table_head'>
           <h4>{data?.your_recent_booking}</h4>
           {bookingInfo.length > 0 && (
            <Link className='link' to='/travel-booking'>
             View more <img src={arrow} alt='...' />
            </Link>
           )}
          </div>
          <Table
           tableData={bookingInfo}
           setSelected={setSelected}
           selected={selected}
          />
          <MobViewBookingCard />
         </div>
        </div>
       </div>
       <div className='db_timeline_section'>
        <BookingStatus
         data={data}
         bookingData={bookingInfo}
         selected={selected}
        />
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 } else return <Loader />;
};

export default DashBoard;

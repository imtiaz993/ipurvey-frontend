import { useQuery } from 'react-query';
import { useState, useRef, useEffect } from 'react';
import '../Style/table.css';
import i from '../../../Assets/Component 38 – 3.png';
import moment from 'moment';
import Loader from '../../../Components/Loader';
import { dashboard } from '../../../Query/queryFunctions';

const Table = ({ tbClass, data }) => {
 const { data: Dashboard } = useQuery('dashboard', dashboard, {
  refetchOnWindowFocus: false,
 });
 const [reqOpen, setreqOpen] = useState(false);
 const ReqRef = useRef(null);
 const handleChatOpen = () => {
  setreqOpen(true);
 };

 const hideChat = () => {
  setreqOpen(false);
 };

 function handler(e) {
  if (ReqRef.current && !ReqRef.current.contains(e.target)) {
   hideChat();
  }
 }

 const head = [
  'TRAVEL DATE',
  'FROM  >   TO',
  'TRAVEL MODE',
  'TRANSPORT OPERATOR',
  'DISRUPTION TYPE',
  'DELAY',
 ];

 useEffect(() => {
  if (reqOpen) {
   document.addEventListener('click', handler);
   return () => document.removeEventListener('click', handler);
  }
 }, [reqOpen]);
 if (data) {
  return (
   <div className='table_container table_bk'>
    {reqOpen ? (
     <div className='hoverI_togle_img2 tbHover' ref={ReqRef}>
      <div className='popover__content2'>
       <h5> New:</h5>
       <p className='popover__message'>{Dashboard?.new_help}</p>
       <h5>Info Required:</h5>
       <p className='popover__message'>{Dashboard?.info_required_help}</p>
       <h5>Claim Requested:</h5>
       <p className='popover__message'>{Dashboard?.claim_requested_help}</p>
       <h5>Expired:</h5>
       <p className='popover__message'>{Dashboard?.expired_help}</p>
       <h5>Closed:</h5>
       <p>{Dashboard?.closed_help}</p>
      </div>
     </div>
    ) : null}
    <table className={`db_table ${tbClass}`}>
     <thead>
      {head.map((val, i) => (
       <th key={i}>{val}</th>
      ))}
      <th
       onClick={() => {
        !reqOpen ? handleChatOpen() : hideChat();
       }}
      >
       STATUS <img style={{ marginLeft: '5px' }} src={i} alt='...' />
      </th>
     </thead>
     <tbody>
      {data.map((booking) => (
       <tr key={booking.id}>
        <td>
         {moment(booking?.travelDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}
        </td>
        <td>{booking?.departureAirport + ' > ' + booking?.arrivalAirport}</td>
        <td>{booking?.travelMode}</td>
        <td>{booking?.transportOperator ?? '-'}</td>
        <td>{booking?.disruptionType ?? '-'}</td>
        <td>{booking?.delay ?? '-'}</td>
        <td>{booking?.dcrStatusHistory.slice(-1)[0].status}</td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  );
 } else return <Loader />;
};

export default Table;

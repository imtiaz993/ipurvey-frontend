import { useQuery } from 'react-query';
import { useState, useEffect, useRef } from 'react';
import '../Style/table.css';
import i from '../../../Assets/Component 38 – 3.png';
import moment from 'moment';
import { dashboard } from '../../../Query/queryFunctions';
const Table = ({ tbClass, tableData, setSelected, selected }) => {
 const { data: Dashboard } = useQuery('dashboard', dashboard, {
  refetchOnWindowFocus: false,
 });
 const [reqOpen, setreqOpen] = useState(false);
 const ReqRef = useRef(null);
 const head = ['TRAVEL DATE', 'FROM  >   TO', 'DISRUPTION TYPE'];
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
 useEffect(() => {
  if (reqOpen) {
   document.addEventListener('click', handler);
   return () => document.removeEventListener('click', handler);
  }
 }, [reqOpen]);

 return (
  <>
   <div className='table_container'>
    {reqOpen ? (
     <div className='hoverI_togle_img2' ref={ReqRef}>
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
      <tr>
       {head.map((val, i) => (
        <th key={i}>{val}</th>
       ))}
       <th
        className='tablePop'
        onClick={() => {
         !reqOpen ? handleChatOpen() : hideChat();
        }}
       >
        STATUS{' '}
        <img
         style={{ marginLeft: '5px' }}
         className='popover__title'
         src={i}
         alt='...'
        />
       </th>
      </tr>
     </thead>

     <tbody>
      {tableData.map((booking) => (
       <tr
        className={selected === booking.id ? 'selected-tr' : ''}
        key={booking.id}
        onClick={() => setSelected(booking.id)}
       >
        <td>{moment(booking.travelDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}</td>
        <td>{booking.departureAirport + ' > ' + booking.arrivalAirport}</td>
        <td>{booking?.disruptionType ?? ''}</td>
        <td>{booking.dcrStatusHistory.slice(-1)[0].status}</td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </>
 );
};

export default Table;

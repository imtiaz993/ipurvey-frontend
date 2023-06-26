import { useEffect, useState } from 'react';
import ReportTimeline from './Timeline';

const BookingStatus = ({ data, bookingData, selected }) => {
 const [_bookingData, setBookingData] = useState(bookingData[0]);

 useEffect(() => {
  const booking = bookingData.find((x) => x.id === selected);
  setBookingData(booking);
 }, [selected]);

 const booking_data = [
  {
   detailName: 'BOOKING REFERENCE',
   detailType: _bookingData?.bookingReference,
  },
  {
   detailName: 'TRAVEL DATE',
   detailType: _bookingData?.travelDate,
  },
  {
   detailName: 'DEPARTURE TIME',
   detailType: _bookingData?.departureTime,
  },
  {
   detailName: 'DEPARTURE LOCATION',
   detailType: _bookingData?.departureAirport,
  },
  {
   detailName: 'TRANSPORT OPERATOR',
   detailType: _bookingData?.transportOperator ?? '-',
  },
  {
   detailName: 'DISRUPTION TYPE',
   detailType: _bookingData?.disruptionType ?? '-',
  },
  {
   detailName: 'DELAY',
   detailType: _bookingData?.delay ?? '-',
  },
 ];
 return (
  <div className='tb_status_container'>
   <div className='tb_status_md'>
    {_bookingData ? (
     <div className='tb_status_sd'>
      <h5>{data?.travel_bookings_status}</h5>
      <div className='Booking_detail_md'>
       <h6>Booking Details</h6>
       <ul className='Booking_detail_ul'>
        {booking_data.map((d, i) => {
         return (
          <li key={i}>
           <p>{d.detailName}</p>
           <p style={{ fontWeight: '500' }}>{d.detailType}</p>
          </li>
         );
        })}
       </ul>
      </div>
      <ReportTimeline data={_bookingData.dcrStatusHistory} />
     </div>
    ) : (
     <div className='tb_status_sd'>
      <h5>{data?.travel_bookings_status}</h5>
      <div className='no-recent-bookings'>No Recent Travel Bookings Found</div>
     </div>
    )}
   </div>
  </div>
 );
};

export default BookingStatus;

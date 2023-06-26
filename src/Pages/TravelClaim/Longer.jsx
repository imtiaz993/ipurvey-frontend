import { useQuery } from 'react-query';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import headImg from '../../Assets/program-work.png';
import Relax from './Relax';
import { home } from '../../Query/queryFunctions';

const Longer = ({ theData }) => {
 function formatDate(dateString) {
  const dateObject = moment(dateString.replace('-', '/'), 'YYYY/MM/DD').format(
   'D MMMM, YYYY'
  );
  return dateObject;
 }
 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });
 return (
  <div className='base-form-row'>
   <div className='base-form-section mr-15'>
    <div className='stepper_form_md'>
     <div className='stepper_form'>
      {theData &&
      Object.keys(theData).length === 0 &&
      Object.getPrototypeOf(theData) === Object.prototype ? (
       <div className='h-673'>
        <CircularProgress />
       </div>
      ) : (
       <>
        <img src={headImg} alt='...' className='error-img' />
        <h2>{Home?.OCH?.we_re_working}</h2>
        <div className='stp_para'>
         <p id='grey-para'>
          <ReactMarkdown>{theData?.ochResponse?.description}</ReactMarkdown>
         </p>
        </div>
        <div className='base-white-section'>
         <div className='row'>
          <div className='col flight-info'>
           <div>
            <h4>Airline</h4>
            <h3>
             {theData.journey.carrierName != ''
              ? theData.journey.carrierName
              : theData.journey.carrierCode}
            </h3>
           </div>
          </div>
          <div className='col flight-info'>
           <div>
            <h4>Flight Number</h4>
            <h3>{theData?.journey.flightNumber}</h3>
           </div>
          </div>
         </div>
         <div className='row'>
          <div className='col flight-info'>
           <div>
            <h4>From</h4>
            <h3>{theData?.journey.departureDetails.airportName}</h3>
           </div>
          </div>
          <div className='col flight-info'>
           <div>
            <h4>To</h4>
            <h3>{theData?.journey.arrivalDetails.airportName}</h3>
           </div>
          </div>
         </div>
         <div className='row'>
          <div className='col flight-info'>
           <div>
            <h4>
             Scheduled
             <br />
             Departure
            </h4>
            <h3>
             {formatDate(theData?.journey.departureDetails.dateLocal)}
             <br />
             {theData?.journey.departureDetails.timeLocal}
            </h3>
           </div>
          </div>
          <div className='col flight-info'>
           <div>
            <h4>
             Scheduled
             <br />
             Arrival
            </h4>
            <h3>
             {formatDate(theData?.journey.arrivalDetails.dateLocal)}
             <br />
             {theData?.journey.arrivalDetails.timeLocal}
            </h3>
           </div>
          </div>
         </div>
        </div>
       </>
      )}
     </div>
    </div>
   </div>
   <Relax desc={theData?.ochResponse?.description} />
  </div>
 );
};

export default Longer;

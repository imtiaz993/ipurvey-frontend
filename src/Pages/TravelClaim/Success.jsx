import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
// import { useHistory } from 'react-router-dom';
import headImg from '../../Assets/undraw_check_boxes_re_v40f.png';
import BaseBankDetails from '../../Components/Base/BaseBankDetails';
import BaseBooking from '../../Components/Base/BaseBooking';
import BaseLogin from '../../Components/Base/BaseLogin';
import BasePassangers from '../../Components/Base/BasePassangers';
import BaseSignUp from '../../Components/Base/BaseSignUp';
import BaseUserAddress from '../../Components/Base/BaseUserAddress';
import BaseVerify from '../../Components/Base/BaseVerify';
import PaymentOptions from '../Payment/PaymentOptions';
import BaseMethod from '../Payment/BaseMethod';
import Done from './Done';
import BasePaymentFailed from '../Payment/BasePaymentFailed';
import BaseSignUpSelect from '../../Components/Base/BaseSignUpSelect';

const Success = ({
 theData,
 setData,
 data,
 screen,
 refresh,
 proceed,
 disabled,
 setStep,
 step,
}) => {
 const [paymentObj, setPaymentObj] = useState(data);
 //  const history = useHistory();
 //  const onRedirect = (redirect) => {
 //   history.push(redirect);
 //  };
 function formatDate(dateString) {
  const dateObject = moment(dateString.replace('-', '/'), 'YYYY/MM/DD').format(
   'D MMMM, YYYY'
  );
  return dateObject;
 }
 return (
  <div className='base-form-row'>
   <div className='base-form-section'>
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
        <img src={headImg} alt='...' className='m-xl' />
        <h2>
         You have an <span className='green'>eligible</span> claim!
        </h2>
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
        {/* <button
         className='stp_back medium mt-2 mb-2'
         id='grey-para'
         onClick={() => onRedirect('/travel-claim')}
        >
         Change Flight Details?
        </button> */}
       </>
      )}
     </div>
    </div>
   </div>
   {screen == 1 ? (
    <BasePassangers
     refresh={refresh}
     proceed={proceed}
     setPaymentObjF={setPaymentObj}
     disabled={disabled}
    />
   ) : screen == 2 ? (
    <BaseBooking
     data={data}
     refresh={refresh}
     proceed={proceed}
     disabled={disabled}
    />
   ) : screen == 3 ? (
    <BaseSignUpSelect disabled={disabled} data={data} proceed={proceed} />
   ) : screen == 4 ? (
    <BaseSignUp data={data} refresh={refresh} proceed={proceed} />
   ) : screen == 5 ? (
    <BaseVerify res={data} PObj={paymentObj} />
   ) : screen == 6 ? (
    <BaseLogin
     res={data}
     proceed={proceed}
     setTheData={setData}
     setPaymentObjF={setPaymentObj}
    />
   ) : screen == 7 ? (
    <BaseUserAddress refresh={refresh} proceed={proceed} setStep={setStep} />
   ) : screen == 8 ? (
    <BaseBankDetails refresh={refresh} proceed={proceed} />
   ) : screen == 9 ? (
    <PaymentOptions
     data={paymentObj}
     theData={theData}
     refresh={refresh}
     proceed={proceed}
     disabled={disabled}
     setPaymentObjF={setPaymentObj}
    />
   ) : screen == 10 ? (
    <BaseMethod
     theData={theData}
     data={paymentObj}
     refresh={refresh}
     proceed={proceed}
     disabled={disabled}
     setPaymentObjF={setPaymentObj}
    />
   ) : screen == 11 ? (
    <BasePaymentFailed data={paymentObj} setStep={setStep} step={step} />
   ) : (
    screen == 12 && <Done />
   )}
  </div>
 );
};

export default Success;

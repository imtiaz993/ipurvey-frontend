import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from '../../Context/authContext';
import DepartureDateForm from '../../Pages/TravelClaim/DepartureDateForm';
import EmailForm from '../../Pages/TravelClaim/EmailForm';
import MoreDetail from '../../Pages/TravelClaim/MoreDetail';
import Success from '../../Pages/TravelClaim/Success';
import WhereWereTraveling from '../../Pages/TravelClaim/WhereWereTraveling';
import logo from '../../Assets/icon-logo.png';
import { API_URL } from '../../Utils/constants';
import axios from 'axios';

const nextStepForm = (
 data,
 proceedC,
 refresh,
 steps,
 disabled,
 setHidden,
 eligibility,
 setData,
 theData,
 setStep
) => {
 switch (steps) {
  case 0:
   return (
    <DepartureDateForm
     data={data}
     proceed={proceedC}
     setDisable={disabled}
     refresh={refresh}
    />
   );
  case 1:
   return (
    <WhereWereTraveling
     data={data}
     proceed={proceedC}
     refresh={refresh}
     disabled={disabled}
    />
   );
  case 2:
   return (
    <MoreDetail
     data={data}
     setHidden={setHidden}
     proceed={proceedC}
     refresh={refresh}
     disabled={disabled}
     setData={setData}
    />
   );
  case 3:
   return (
    <EmailForm
     data={data}
     proceed={proceedC}
     refresh={refresh}
     eligible={eligibility}
    />
   );
  case 4:
   return (
    <Success
     theData={theData}
     data={data}
     proceed={proceedC}
     refresh={refresh}
     screen={1}
    />
   );
  case 5:
   return (
    <Success
     theData={theData}
     disabled={disabled}
     data={data}
     proceed={proceedC}
     refresh={refresh}
     screen={2}
    />
   );
  case 6:
   return (
    <Success
     theData={theData}
     data={data}
     proceed={proceedC}
     disabled={disabled}
     screen={3}
    />
   );
  case 7:
   return (
    <Success
     theData={theData}
     data={data}
     proceed={proceedC}
     refresh={refresh}
     screen={4}
    />
   );
  case 8:
   return <Success theData={theData} data={data} screen={5} />;
  case 9:
   return (
    <Success
     setData={setData}
     theData={theData}
     data={data}
     proceed={proceedC}
     screen={6}
    />
   );
  case 10:
   return (
    <Success
     theData={theData}
     proceed={proceedC}
     refresh={refresh}
     screen={7}
    />
   );
  case 11:
   return (
    <Success
     theData={theData}
     data={data}
     proceed={proceedC}
     refresh={refresh}
     screen={8}
    />
   );
  case 12:
   return (
    <Success
     disabled={disabled}
     theData={theData}
     data={data}
     proceed={proceedC}
     refresh={refresh}
     screen={9}
    />
   );
  case 13:
   return (
    <Success
     disabled={disabled}
     theData={theData}
     data={data}
     proceed={proceedC}
     refresh={refresh}
     screen={10}
    />
   );
  case 14:
   return (
    <Success
     theData={theData}
     data={data}
     proceed={proceedC}
     refresh={refresh}
     setStep={setStep}
     step={steps}
     screen={11}
    />
   );
  case 15:
   return (
    <Success
     theData={theData}
     data={data}
     proceed={proceedC}
     refresh={refresh}
     screen={12}
    />
   );
  default:
   break;
 }
};

const Forms = ({ data, verifyed, payment, continueJourney, success }) => {
 const history = useHistory();
 const [theData, setData] = useState({});
 const [refresh, setRefresh] = useState(0);
 const [nextStep, setNextStep] = useState(0);
 const [proceed, setProceed] = useState(false);
 const [disabled, setDisabled] = useState(false);
 const [hidden, setHidden] = useState(false);
 const [eligibility, setEligibility] = useState(false);
 const [logged, setLogged] = useState(false);
 const { user } = useAuthContext();

 useEffect(() => {
  setLogged(user?.isAuthenticated);
  if (verifyed) {
   setNextStep(9);
   success(2);
  } else if (payment) {
   const _theData = JSON.parse(localStorage.getItem('OCH'));
   setData(_theData);
   setNextStep(13);
   success(4);
  } else if (continueJourney) {
   const res = JSON.parse(localStorage.getItem('OCH'));
   setData({
    ochResponse: {
     description:
      'We have found your journey. It was subject to a qualifying travel disruption. We can automatically request a travel disruption claim. Details are available in the account dashboard of registered users.',
    },
    journey: {
     carrierName: res.airline,
     flightNumber: res.flightNumber,
     departureDetails: {
      airportName: res.arrivalAirportName,
      timeLocal: res.departureTime,
      dateLocal: `${res.departureDate[0]}-${res.departureDate[1]}-${res.departureDate[2]}`,
      // dateLocal: new Date(
      //  `${res.departureDate[0]}-${res.departureDate[1]}-${res.departureDate[2]}`
      // ),
     },
     arrivalDetails: {
      airportName: res.arrivalAirportName,
      timeLocal: res.arrivalTime,
      // dateLocal: new Date(
      //  `${res.arrivalDate[0]}-${res.arrivalDate[1]}-${res.arrivalDate[2]}`
      dateLocal: `${res.arrivalDate[0]}-${res.arrivalDate[1]}-${res.arrivalDate[2]}`,
     },
    },
   });
   success(2);
   setNextStep(4);
  }
 }, []);

 useEffect(() => {
  if (proceed) handleNextButton();
 }, [proceed]);

 const handleNextButton = () => {
  if (!logged && nextStep == 6) {
   localStorage.setItem('OCH', JSON.stringify(theData));
  }
  if (logged && nextStep == 2) {
   setNextStep(nextStep + 2);
  } else if (logged && nextStep == 5) {
   setNextStep(nextStep + 7);
  } else if (nextStep >= 14) {
   setNextStep(nextStep + 1);
   success(4);
  } else {
   setNextStep(nextStep + 1);
   if (nextStep == 14 || nextStep == 15) {
    success(3);
   } else {
    if (nextStep + 1 >= 4) {
     success(2);
    } else {
     success(1);
    }
   }
  }
  setProceed(false);
 };
 const handleEligibility = (bool) => {
  setEligibility(bool);
 };
 const handleDisabled = (bool) => {
  setDisabled(bool);
 };
 const proceedCallBack = () => {
  setProceed(true);
  setEligibility(false);
 };

 const handleBackButton = () => {
  setDisabled(false);
  setProceed(false);
  if (nextStep == 12 && logged) {
   setNextStep(nextStep - 7);
  } else if (nextStep > 0) {
   if (nextStep === 4 && logged) setNextStep(nextStep - 2);
   else setNextStep(nextStep - 1);
  } else {
   history.push('/');
  }
 };

 return (
  <>
   {nextStepForm(
    data,
    proceedCallBack,
    refresh,
    nextStep,
    handleDisabled,
    setHidden,
    handleEligibility,
    setData,
    theData,
    setNextStep
   )}
   <div
    className='d-flex steps-flex-div'
    style={{
     padding:
      nextStep != 8 && nextStep != 9 && nextStep < 14 && !hidden
       ? '0px 50px'
       : '0px 50px',
     justifyContent:
      nextStep != 8 && nextStep != 9 && nextStep < 14 && !hidden
       ? 'space-between'
       : 'unset',
    }}
   >
    <div className='powered-link'>
     <Link to='/'>
      <div className='powered'>
       <h3>Powered by:</h3>
       <div className='flex-row'>
        <img className='icon-logo' src={logo} />
        <div className='flex-column'>
         <span className='text'>iPurvey Advanced Claim</span>
         <span className='semibold'>Compensation System</span>
        </div>
       </div>
      </div>
     </Link>
    </div>
    {nextStep != 8 && nextStep != 9 && nextStep < 14 && !hidden && (
     <div
      className='stp-new-btns'
      style={{ marginRight: nextStep > 3 ? '10%' : '25%' }}
     >
      {!logged && (nextStep == 5 || nextStep == 6 || nextStep == 7) && (
       <button
        className='stp-new-back'
        onClick={!logged && nextStep == 5 ? () => {} : handleBackButton}
       >
        Already a member?{' '}
        <Link to='/login' className='stp_link'>
         Login
        </Link>
       </button>
      )}

      <button className='stp-new-back' onClick={handleBackButton}>
       Back
      </button>
      <button
       className='home_form_btn medium'
       disabled={disabled}
       onClick={() => {
        setRefresh(refresh + 1);
       }}
      >
       {(!logged && nextStep == 6) || (!logged && nextStep == 5)
        ? 'Continue & sign up'
        : eligibility
        ? 'Check Eligibility'
        : nextStep == 11
        ? 'Sign Up for iPurvey'
        : 'Continue'}
      </button>
     </div>
    )}
   </div>
  </>
 );
};

export default Forms;

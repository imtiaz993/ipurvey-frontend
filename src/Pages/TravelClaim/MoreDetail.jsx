import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import SockJsClient from 'react-stomp';
import twoPlan from '../../Assets/Group 5036.png';
import plan from '../../Assets/Icon ionic-ios-airplane.png';
import errorIcon from '../../Assets/Icon material-error.png';
import BLoading from '../../Components/Base/BLoading';
import TLoading from '../../Components/Base/TLoading';
import Loader from '../../Components/Loader';
import { API_URL } from '../../Utils/constants';
import mapping from '../../Utils/mapping';
import Error from './Error';
import NoRes from './NoRes';
import Longer from './Longer';
import { useAuthContext } from '../../Context/authContext';

const MoreDetail = ({
 data,
 refresh,
 proceed,
 disabled,
 setData,
 setHidden,
}) => {
 const [_refresh, setUnderscoreRefresh] = useState(10000);
 const [connected, setConnected] = useState(false);
 const [loading, setLoading] = useState(false);
 const [flightType, setFlightType] = useState('');
 const [flightNo, setFlightNo] = useState('');
 const [noRes, setNoRes] = useState(true);
 const [screen, setScreen] = useState(0);
 const [identifier, setIdentifier] = useState();
 const [error, setError] = useState('');
 const [client, setClient] = useState();
 const [theData, setTheData] = useState({});
 const noResRef = useRef(noRes);
 const location = useRef({ query: '00.000.0.000' });
 noResRef.current = noRes;

 //  Using react-stomp
 //  https://github.com/lahsivjar/react-stomp/blob/master/API.md

 const { user } = useAuthContext();

 const travelClaim = async (payload) => {
  const res = await axios.post(
   `${API_URL.OCH}/orchestrator/flight/booking/requests/oneAndThree`,
   payload
  );
  return res;
 };

 const reftch = async (payload) =>
  await axios.get(
   `${API_URL.OCH}/orchestrator/checkException/${identifier}`,
   payload
  );

 const mutation = useMutation(travelClaim, {
  onSuccess: async (_) => {
   console.log('Post Sent Successfully');
   setTimeout(() => {
    console.log('Preparing Refetch');
    if (noResRef.current) {
     console.log('Refetch Called');
     secondMutation.mutate();
    }
   }, 20000);
  },
 });

 const secondMutation = useMutation(reftch, {
  onSuccess: (res) => {
   const _reposnse = res.data;
   console.log('Refetch Response:', _reposnse);
   if (user.isAuthenticated && _reposnse.instructionIdentification) {
    axios.put(
     `${API_URL.OCH}/api/passenger-details/${_reposnse.instructionIdentification}`,
     { bookingEmailAddress: user.email },
     {
      headers: {
       Authorization: user.customerNumber,
       'Content-Type': 'application/json',
      },
     }
    );
   }
   if (_reposnse.ochResponse == null) {
    setScreen(4);
    setLoading(false);
    return;
   }
   const _data = mapping.find(
    (o) => o.id === _reposnse.ochResponse.responseCode
   );
   setTheData(_reposnse);
   setScreen(_data.screen);
   setLoading(false);
  },
 });

 useEffect(async () => {
  setUnderscoreRefresh(refresh);
  setIdentifier((Math.random() + 1).toString(36).substring(2));
  try {
   const response = await axios.get('http://ip-api.com/json');
   location.current = response.data;
  } catch (error) {
   console.log('Ad Blocker is Enabled');
  }
 }, []);

 useEffect(() => {
  disabled(loading);
 }, [loading]);

 useEffect(() => {
  if (screen == 0) {
   disabled(!connected);
  }
 }, [connected]);

 useEffect(() => {
  if (refresh > _refresh) {
   onSubmit();
  }
 }, [refresh]);

 useEffect(() => {
  let { flight_no, flight_type } = JSON.parse(
   localStorage.getItem('travelModel')
  );
  if (flight_no && flight_type) {
   setFlightNo(flight_no);
   setFlightType(flight_type);
  }
 }, []);

 const handleTravelMode = (event) => {
  setFlightType(event);
 };

 const handleOCH = (message) => {
  setNoRes(false);
  if (message.ochResponse == null) {
   setScreen(4);
   setLoading(false);
   return;
  }
  const _data = mapping.find((o) => o.id === message.ochResponse.responseCode);
  console.log(_data);
  setTheData(message);
  setScreen(_data.screen);
  setLoading(false);
 };

 const validate = () => {
  let errors = {};
  let isValid = true;

  if (flightType === '') {
   isValid = false;
   errors['flightType'] = 'Please select flight type';
  }

  if (flightNo === '') {
   isValid = false;
   errors['flightNo'] = 'Please enter flight number';
  } else if (flightNo.length < 2) {
   isValid = false;
   errors['flightNo'] = 'Please enter a valid flight number';
  }

  setError(errors);

  return isValid;
 };

 const onSubmit = async () => {
  if (validate()) {
   const existing = JSON.parse(localStorage.getItem('travelModel'));
   existing.flight_type = flightType;
   existing.flight_no = flightNo;
   localStorage.setItem('travelModel', JSON.stringify(existing));
   const oneWay = [
    {
     arrivalDetails: {
      airportCode: existing.arrival_airport_value,
      airportName: existing.arrival_airport,
      dateLocal: '',
      timeLocal: '',
      dateUTC: '',
      timeUTC: '',
      gate: '',
     },
     departureDetails: {
      airportCode: existing.departure_airport_value,
      airportName: existing.departure_airport,
      dateLocal: existing.departure_date,
      timeLocal: existing.departure_time,
      dateUTC: '',
      timeUTC: '',
      gate: '',
     },
     carrierCode: '',
     carrierName: '',
     flightNumber: flightNo,
     legId: 1,
    },
   ];

   //! TwoWay has yet to be implemented
   const twoWay = [
    {
     arrivalDetails: {
      airportCode: existing.arrival_airport_value,
      airportName: existing.arrival_airport,
      dateLocal: '2015-06-05',
      dateUTC: '2015-06-05',
      gate: 'string',
      timeLocal: '15:00',
      timeUTC: '15:00',
     },
     carrierCode: 'BA',
     carrierName: 'British Airways',
     departureDetails: {
      airportCode: existing.departure_airport_value,
      airportName: existing.departure_airport,
      dateLocal: existing.departure_date,
      dateUTC: '2015-06-05',
      gate: 'string',
      timeLocal: '10:00',
      timeUTC: '10:00',
     },
     flightNumber: flightNo,
     legId: 1,
    },
    {
     arrivalDetails: {
      airportCode: existing.arrival_airport_value,
      airportName: existing.arrival_airport,
      dateLocal: '2015-06-05',
      dateUTC: '2015-06-05',
      gate: 'A',
      timeLocal: '15:00',
      timeUTC: '15:00',
     },
     carrierCode: 'BA',
     carrierName: 'British Airways',
     departureDetails: {
      airportCode: existing.departure_airport_value,
      airportName: existing.departure_airport,
      dateLocal: existing.departure_date,
      dateUTC: '2015-06-05',
      gate: 'A',
      timeLocal: '10:00',
      timeUTC: '10:00',
     },
     flightNumber: flightNo,
     legId: 2,
    },
   ];

   const data = {
    flightInfo: {
     channelId: 1,
     customerReference: '',
     bookingEmailAddress: '',
     thirdPartyCustomerIdentification: '',
     travelMode: existing.travel_mode,
     bookingReference: '',
     termsOfService: '',
     ipaddress: location.current.query,
    },
    journey: flightType === 'twoWay' ? twoWay : oneWay,
    socketId: identifier,
   };
   console.log('Payload Sent: ', data); //! Payload
   mutation.mutate(data);
   setLoading(true);
  }
 };
 if (screen === 1) {
  setData(theData);
  disabled(false);
  proceed();
  return <Loader />;
 } else if (screen === 2) {
  setHidden(true);
  return <Error theData={theData} />;
 } else if (screen === 3) {
  setHidden(true);
  return <Longer theData={theData} />;
 } else if (screen === 4) {
  setHidden(true);
  return <NoRes />;
 } else {
  return (
   <>
    <SockJsClient
     url={`${API_URL.OCH}/push-message-mapping/`}
     topics={[`${identifier}-ipurvey.och_dcr_response.incoming`]}
     onMessage={(message) => handleOCH(message)}
     debug={true}
     ref={(client) => setClient(client)}
     onDisconnect={() => {
      console.log('Disconnected to OCH');
      setConnected(false);
     }}
     onConnect={() => {
      console.log('Connected to OCH');
      setConnected(true);
     }}
    />
    {loading ? (
     <TLoading />
    ) : (
     <>
      {connected ? (
       <div className='base-form-container'>
        <div className='stepper_form_md'>
         <div className='stepper_form'>
          <h2 className='m-xl'>{data?.form?.details}</h2>
          <p className='flight_type'>Flight Type</p>
          <div className='selection_travel_mode'>
           <div
            className={
             flightType === 'oneWay' ? 'byAir_mode activate' : 'byAir_mode'
            }
            onClick={() => {
             handleTravelMode('oneWay');
             setError({ ...error, flightType: '' });
            }}
           >
            <img src={plan} alt='...' />
            <p>One Way</p>
           </div>
           <div className='hover_togle'>
            <div
             className={
              flightType === 'twoWay' ? 'byTrain_mode activate' : 'byTrain_mode'
             }
            >
             <img src={twoPlan} alt='...' />
             <p>Round Trip</p>
            </div>
            <div className='hover_i' id='wierd-hover'>
             <p>{data?.form?.round_trip_disabled}</p>
            </div>
           </div>
          </div>
          {error.flightType && (
           <div className='getError_md'>
            <img src={errorIcon} alt='...' />
            <p>{error.flightType}</p>
           </div>
          )}
          <div className='flight_num'>
           <p className='tlgt_num'>Flight Number</p>
           <input
            value={flightNo}
            type='text'
            name='text'
            onChange={(e) => {
             const regex = /[^a-z0-9]/gi;
             setFlightNo(e.target.value.replace(regex, ''));
             setError({ ...error, flightNo: '' });
            }}
            placeholder='QA1234'
           />
           {error.flightNo && (
            <div className='getError_md'>
             <img src={errorIcon} alt='...' />
             <p>{error.flightNo}</p>
            </div>
           )}
          </div>
         </div>
        </div>
       </div>
      ) : (
       <BLoading />
      )}
     </>
    )}
   </>
  );
 }
};

export default MoreDetail;

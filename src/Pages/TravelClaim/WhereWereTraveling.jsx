import { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { useQuery } from 'react-query';
import arrival2 from '../../Assets/Icon awesome-plane-arriva.png';
import arrival from '../../Assets/Icon awesome-plane-arrival.png';
import errorIcon from '../../Assets/Icon material-error.png';
import drop from '../../Assets/Path 6473@3x.png';
import path from '../../Assets/Path 6636.png';
import headImg from '../../Assets/undraw_Airport_re_oqk1.png';
import BLoading from '../../Components/Base/BLoading';
import { API_URL } from '../../Utils/constants';

const WhereWereTraveling = ({ data, refresh, proceed, disabled }) => {
 const [departAir, setDepartAir] = useState('');
 const [departAirVal, setDepartAirVal] = useState('');
 const [arrivalAir, setArrivalAir] = useState('');
 const [arrivalAirVal, setArrivalAirVal] = useState('');
 const [error, setError] = useState('');
 const [_refresh, setUnderscoreRefresh] = useState(10000);
 const [departAirport, setDepartAirport] = useState('');
 const [arrivalAirport, setArrivalAirport] = useState('');

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

 useEffect(() => {
  setUnderscoreRefresh(refresh);
 }, []);
 useEffect(() => {
  if (refresh > _refresh) {
   onSubmit();
  }
 }, [refresh]);

 const onSelectDepart = (_, newValue) => {
  setDepartAirport(newValue);
  setDepartAir(newValue?.airport ?? '');
  setDepartAirVal(newValue?.iataCode ?? '');
 };
 const onSelectArrival = (_, newValue) => {
  setArrivalAirport(newValue);
  setArrivalAir(newValue?.airport ?? '');
  setArrivalAirVal(newValue?.iataCode ?? '');
 };

 const validate = () => {
  let errors = {};
  let isValid = true;
  if (departAir === '') {
   isValid = false;
   errors['departAir'] = 'Please select a departure airport';
  }
  if (arrivalAir === '') {
   isValid = false;
   errors['arrivalAir'] = 'Please select a arrival airport';
  }

  if (
   !errors['departAir'] &&
   !errors['arrivalAir'] &&
   arrivalAir === departAir
  ) {
   isValid = false;
   errors['same'] = "Departure and arrival airport can't be the same";
  }
  setError(errors);
  return isValid;
 };
 useEffect(() => {
  if (isLoading == false) {
   const {
    departure_airport,
    arrival_airport,
    departure_airport_value,
    arrival_airport_value,
   } = JSON.parse(localStorage.getItem('travelModel'));
   let departAirportData = airport.find(
    (_airport) => _airport.airport === departure_airport
   );
   let arrivalAirportData = airport.find(
    (_airport) => _airport.airport === arrival_airport
   );
   setArrivalAir(arrival_airport);
   setDepartAir(departure_airport);
   setArrivalAirport(arrivalAirportData);
   setDepartAirport(departAirportData);
   setDepartAirVal(departure_airport_value);
   setArrivalAirVal(arrival_airport_value);
  }
 }, [isLoading]);

 const onSubmit = () => {
  if (validate()) {
   const existing = JSON.parse(localStorage.getItem('travelModel'));
   existing.departure_airport = departAir;
   existing.departure_airport_value = departAirVal;
   existing.arrival_airport = arrivalAir;
   existing.arrival_airport_value = arrivalAirVal;
   localStorage.setItem('travelModel', JSON.stringify(existing));
   proceed();
  }
 };

 if (isLoading) {
  disabled(true);
  return <BLoading />;
 } else {
  disabled(false);
  return (
   <div className='base-form-container'>
    <div className='stepper_form_md'>
     <div className='stepper_form'>
      <img src={headImg} alt='...' />
      <h2>{data?.form?.how_travel}</h2>
      <div className='stp_inp arrive_inp'>
       <img src={arrival} alt='...' />
       <img src={drop} className='trailing-icon' alt='...' />
       <Autocomplete
        className='autoComplt'
        options={airport}
        autoHighlight
        value={departAirport}
        getOptionLabel={(option) => option.airport}
        onChange={(event, newValue) => {
         onSelectDepart(event, newValue);
         setError({ ...error, departAir: '' });
        }}
        renderInput={(params) => (
         <TextField
          {...params}
          className='textField'
          placeholder='Departure Airport e.g. London or LHA'
         />
        )}
       />
      </div>
      {error.departAir && (
       <div className='getError_md_start' id='center-err'>
        <img src={errorIcon} alt='...' />
        <p>{error.departAir}</p>
       </div>
      )}
      <div className='arrival_path'>
       <img src={path} alt='...' />
      </div>
      <div className='stp_inp arrive_inp2'>
       <img src={arrival2} alt='...' />
       <img src={drop} className='trailing-icon' alt='...' />
       <Autocomplete
        className='autoComplt'
        options={airport}
        autoHighlight
        value={arrivalAirport}
        getOptionLabel={(option) => option.airport}
        onChange={(event, newValue) => {
         onSelectArrival(event, newValue);
         setError({ ...error, arrivalAir: '' });
        }}
        renderInput={(params) => (
         <TextField
          {...params}
          placeholder='Arrival Airport e.g. Dubai or DIA'
         />
        )}
       />
      </div>
      {error.arrivalAir && (
       <div className='getError_md_start' id='center-err'>
        <img src={errorIcon} alt='...' />
        <p>{error.arrivalAir}</p>
       </div>
      )}
     </div>
    </div>
    {error.same && (
     <div className='getError_md_start' id='center-err'>
      <img src={errorIcon} alt='...' />
      <p>{error.same}</p>
     </div>
    )}
   </div>
  );
 }
};
export default WhereWereTraveling;

import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { COUNTRIES } from '../../Constant/countries';
import headImg from '../../Assets/undraw_location_review_dmxd@3x.png';
import errorIcon from '../../Assets/Icon material-error.png';
import { home } from '../../Query/queryFunctions';

const UserAdressForm2 = ({ proceed, refresh, setManual }) => {
 const [line1, setLine1] = useState('');
 const [line2, setLine2] = useState('');
 const [line3, setLine3] = useState('');
 const [county, setCounty] = useState('');
 const [selectedCountry, setSelectedCountry] = useState('');
 const [selectedCountryArray, setSelectedCountryArray] = useState([]);
 const [_refresh, setUnderscoreRefresh] = useState(10000);

 const [postCode, setPostCode] = useState('');
 const [disable, setDisable] = useState(false);
 const [countryValue, setCountryValue] = useState('');
 const [error, setError] = useState('');

 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });

 useEffect(() => {
  const detail = JSON.parse(localStorage.getItem('addressDetail'));

  if (detail !== null) {
   setDisable(true);
   setLine1(detail.line1);
   setLine2(detail.line2);
   setLine3(detail.line3);
   setCounty(detail.county);
   setPostCode(detail.postcode);
   getCountry(detail.country);
  }
  setUnderscoreRefresh(refresh);
 }, []);

 useEffect(() => {
  if (refresh > _refresh) {
   onSubmit();
  }
 }, [refresh]);
 const handleChange = (data) => {
  setSelectedCountryArray(data);
  if (data.length > 0) {
   setCountryValue(data[0].value);
   setSelectedCountry(data[0].label);
  } else {
   setCountryValue('');
   setSelectedCountry('');
  }
 };

 const getCountry = (value) => {
  const country = COUNTRIES.filter((x) => {
   return x.label === value;
  });
  setSelectedCountryArray(country);
  if (country.length > 0) {
   setCountryValue(country[0].value);
   setSelectedCountry(country[0].label);
  } else {
   setCountryValue('');
   setSelectedCountry('');
  }
 };

 const validate = () => {
  let errors = {};
  let isValid = true;

  if (line1 === '') {
   isValid = false;
   errors['line1'] = 'Please enter line 1';
  }
  if (selectedCountry === '') {
   isValid = false;
   errors['selectedCountry'] = 'Please select country';
  }
  if (postCode === '') {
   isValid = false;
   errors['postCode'] = 'Please enter post code';
  }
  setError(errors);
  return isValid;
 };

 const onSubmit = () => {
  if (validate()) {
   const detail = {
    line1: line1,
    line2: line2,
    line3: line3,
    county: county,
    country: selectedCountry,
    country_value: countryValue,
    postcode: postCode,
   };
   localStorage.setItem('addressDetail', JSON.stringify(detail));
   proceed();
  }
 };
 return (
  <div className='base-singup-container'>
   <div className='account_form_md'>
    <div className='account_form_sd'>
     <div className='form_head_md'>
      <div>
       <img src={headImg} alt='...' />
       <h4 className='address_header'>
        <b>{Home?.Payment?.address_form_title}</b>
       </h4>
       <p className='vfy_email_body'>{Home?.Payment?.address_form_text}</p>
      </div>

      <div className='home_form_div_sd'>
       <input
        id='white-center-icon'
        type='text'
        disabled={disable}
        onChange={(e) => setLine1(e.target.value)}
        value={line1}
        placeholder='Line 1'
       />
       {error.line1 && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.line1}</p>
        </div>
       )}
       <input
        id='white-center-icon'
        type='text'
        disabled={disable}
        onChange={(e) => setLine2(e.target.value)}
        value={line2}
        placeholder='Line 2'
       />
       <input
        id='white-center-icon'
        type='text'
        disabled={disable}
        onChange={(e) => setLine3(e.target.value)}
        value={line3}
        placeholder='Line 3'
       />
       <input
        id='white-center-icon'
        type='text'
        disabled={disable}
        onChange={(e) => setCounty(e.target.value)}
        value={county}
        placeholder='County'
       />
       {error.county && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.county}</p>
        </div>
       )}
       <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={6}>
         <Typeahead
          id='basic-example'
          labelKey='label'
          options={COUNTRIES}
          placeholder='Country'
          selected={selectedCountryArray}
          disabled={disable}
          onChange={(data) => handleChange(data)}
          inputProps={{
           className: 'my-custom-classname',
           id: 'white-center-icon',
          }}
         />

         {error.selectedCountry && (
          <div className='getError_md_start'>
           <img src={errorIcon} alt='...' />
           <p>{error.selectedCountry}</p>
          </div>
         )}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
         <input
          id='white-center-icon'
          type='text'
          disabled={disable}
          onChange={(e) => setPostCode(e.target.value)}
          value={postCode}
          placeholder='PostCode'
         />
         {error.postCode && (
          <div className='getError_md_start'>
           <img src={errorIcon} alt='...' />
           <p>{error.postCode}</p>
          </div>
         )}
        </Grid>
       </Grid>
       <div className='address_footer'>
        <p className='text'>{Home?.Payment?.address_form_couldnt_find}</p>
        <button className='manual_link' onClick={() => setManual(false)}>
         {Home?.Payment?.manual_address_text}
        </button>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default UserAdressForm2;

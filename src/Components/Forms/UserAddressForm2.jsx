import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { COUNTRIES } from '../../Constant/countries';
import headImg from '../../Assets/undraw_location_review_dmxd@3x.png';
import errorIcon from '../../Assets/Icon material-error.png';
import { home } from '../../Query/queryFunctions';

const UserAdressForm2 = ({ nextBtn, backBtn }) => {
 const [line1, setLine1] = useState();
 const [line2, setLine2] = useState();
 const [line3, setLine3] = useState();
 const [county, setCounty] = useState();
 const [selectedCountry, setSelectedCountry] = useState();
 const [selectedCountryArray, setSelectedCountryArray] = useState([]);

 const [postCode, setPostCode] = useState();
 const [disable, setDisable] = useState(false);
 const [countryValue, setCountryValue] = useState('');
 const [error, setError] = useState('');

 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });

 useEffect(() => {
  const travelModel = JSON.parse(localStorage.getItem('travelModel'));

  if (travelModel !== null) {
   let { line1, line2, line3, county, country, detailPostCode } = travelModel;
   if (
    line1 != null &&
    line2 != null &&
    line3 != null &&
    county != null &&
    country != null &&
    detailPostCode != null
   ) {
    setDisable(true);
    setLine1(line1);
    setLine2(line2);
    setLine3(line3);
    setCounty(county);
    setPostCode(detailPostCode);
    getCountry(country);
   }
  }
  return () => {
   setDisable(false);
  };
 }, []);

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
   errors['line1'] = 'Please enter line1.';
  }
  if (selectedCountry === '') {
   isValid = false;
   errors['selectedCountry'] = 'Please select country.';
  }
  if (postCode === '') {
   isValid = false;
   errors['postCode'] = 'Please enter post code.';
  }

  setError(errors);

  return isValid;
 };

 const onNextBtn = () => {
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
   nextBtn();
  }
 };
 return (
  <div className='steper_form_container'>
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
        type='text'
        disabled={disable}
        onChange={(e) => setLine2(e.target.value)}
        value={line2}
        placeholder='Line 2'
       />
       <input
        type='text'
        disabled={disable}
        onChange={(e) => setLine3(e.target.value)}
        value={line3}
        placeholder='Line 3'
       />
       <input
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
       <div className='stp_btns'>
        <button className='home_form_btn' onClick={onNextBtn}>
         Next{' '}
        </button>
        <button className='stp_back' onClick={backBtn}>
         Back
        </button>
       </div>
       <div className='address_footer'>
        <p className='text'>{Home?.Payment?.address_form_couldnt_find}</p>
        <Link className='manual_link' to='!#'>
         {Home?.Payment?.manual_address_text}
        </Link>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default UserAdressForm2;

import { useQuery } from 'react-query';
import { CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useMutation } from 'react-query';
import { findAddress, home } from '../../Query/queryFunctions';
// assets
import errorIcon from '../../Assets/Icon material-error.png';
import drop from '../../Assets/Path 6473@3x.png';
import headImg from '../../Assets/undraw_location_review_dmxd@3x.png';
import { useEffect } from 'react';

const UserAdressForm = ({ nextBtn }) => {
 const [postCode, setPostCode] = useState('');
 const [addressList, setAddressList] = useState([]);
 const [selectedAddress, setSelectedAddress] = useState('');
 const [selectedAddressArray, setSelectedAddressArray] = useState([]);

 const [line1, setLine1] = useState();
 const [line2, setLine2] = useState();
 const [line3, setLine3] = useState();
 const [county, setCounty] = useState();
 const [country, setCountry] = useState();
 const [detailPostCode, setDetailPostCode] = useState();

 const [error, setError] = useState('');

 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });

 useEffect(() => {
  if (
   line1 !== null &&
   line2 !== null &&
   line3 !== null &&
   county !== null &&
   country !== null &&
   detailPostCode !== null
  ) {
   let travelModel = JSON.parse(localStorage.getItem('travelModel'));
   if (travelModel == null) {
    travelModel = {};
   }
   travelModel.line1 = line1;
   travelModel.line2 = line2;
   travelModel.line3 = line3;
   travelModel.county = county;
   travelModel.country = country;
   travelModel.detailPostCode = detailPostCode;
   localStorage.setItem('travelModel', JSON.stringify(travelModel));
  }
 }, [line1, line2, line3, country, country, detailPostCode]);

 const mutation = useMutation(findAddress, {
  onSuccess: ({ result }) => {
   setAddressList(result);
  },
 });

 useEffect(() => {
  if (postCode === '') {
   let travelModel = JSON.parse(localStorage.getItem('travelModel'));
   setPostCode((travelModel && travelModel.postCode) || '');
  }
 }, []);

 useEffect(() => {
  if (postCode !== '') {
   let travelModel = JSON.parse(localStorage.getItem('travelModel'));
   if (travelModel == null) {
    travelModel = {};
   }
   travelModel.postCode = postCode;
   localStorage.setItem('travelModel', JSON.stringify(travelModel));
  }
 });

 const { isLoading, isError, error: serverError, isSuccess } = mutation;

 const onSelectAddress = (address) => {
  setSelectedAddressArray(address);
  if (address.length > 0) {
   setSelectedAddress(address[0].line_1 || '');
   setLine1(address[0].line_1 || '');
   setLine2(address[0].line_2 || '');
   setLine3(address[0].line_3 || '');
   setCounty(address[0].county || '');
   setCountry(address[0].country || '');
   setDetailPostCode(address[0].postcode || '');
  } else {
   setSelectedAddress('');
   setLine1('');
   setLine2('');
   setLine3('');
   setCounty('');
   setCountry('');
   setDetailPostCode('');
  }
 };

 const postCodeValidate = () => {
  let errors = {};
  let isValid = true;

  if (postCode === '') {
   isValid = false;
   errors['postCode'] = 'Please enter postal code.';
  }

  setError(errors);

  return isValid;
 };

 const onFindAddress = () => {
  if (postCodeValidate()) {
   mutation.mutate(postCode);
  }
 };

 const validate = () => {
  let errors = {};
  let isValid = true;

  if (postCode === '') {
   isValid = false;
   errors['postCode'] = 'Please enter post code.';
  }
  if (postCode !== '') {
   if (addressList.length === 0) {
    isValid = false;
    errors['addressList'] = 'Please find address first.';
   }
  }

  if (selectedAddress === '') {
   isValid = false;
   errors['selectedAddress'] = 'Please select address.';
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
    country: country,
    postcode: detailPostCode,
   };
   localStorage.setItem('addressDetail', JSON.stringify(detail));
   nextBtn();
  }
 };

 const getErrorMessage = (messageString) => {
  let indexOfStart = messageString.indexOf('[');
  let errorsArray = JSON.parse(
   messageString.slice(indexOfStart, messageString.length)
  );
  return errorsArray[0].message;
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
       <div className='postal_Code acc_postal_code'>
        <input
         type='text'
         value={postCode}
         onChange={(e) => {
          setPostCode(e.target.value);
          setError({ ...error, postCode: '' });
         }}
         placeholder='Postcode'
        />

        <button onClick={onFindAddress} disabled={isLoading}>
         {isLoading ? (
          <CircularProgress size={15} color='#FFF' />
         ) : (
          'Find Address'
         )}
        </button>
       </div>
       {isError && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{getErrorMessage(serverError.error)}</p>
        </div>
       )}
       {error.postCode && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.postCode}</p>
        </div>
       )}
       {error.addressList && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.addressList}</p>
        </div>
       )}
       {isSuccess && (
        <>
         <div className='stp_inp arrive_inp2'>
          <Typeahead
           id='basic-example'
           labelKey='line_1'
           options={addressList}
           placeholder='Please select your address'
           selected={selectedAddressArray}
           onChange={(data) => {
            onSelectAddress(data);
            setError({ ...error, addressList: '' });
           }}
           inputProps={{
            className: 'my-custom-classname',
           }}
          />
          <img
           src={drop}
           className='trailing-icon pt-1'
           id='neg_54'
           alt='...'
          />
         </div>
         {error.selectedAddress && (
          <div className='getError_md_start'>
           <img src={errorIcon} alt='...' />
           <p>{error.selectedAddress}</p>
          </div>
         )}
         <textarea
          style={{ textAlign: 'center' }}
          name=''
          id=''
          cols='30'
          rows='7'
          value={
           selectedAddress !== ''
            ? (line1 !== '' ? line1 + '\n\r' : '') +
              (line2 !== '' ? line2 + '\n\r' : '') +
              (line3 !== '' ? line3 + '\n\r' : '') +
              (county !== '' ? county + '\n\r' : '') +
              (country !== '' ? country + '\n\r' : '') +
              (detailPostCode !== '' ? detailPostCode : '')
            : ''
          }
          // placeholder='User address to be display here'
         />
        </>
       )}
       <div className='address_btn'>
        <button className='home_form_btn' onClick={onNextBtn}>
         Next
        </button>
       </div>
       <div className='address_footer'>
        <p className='text'>{Home?.Payment?.address_form_couldnt_find}</p>
        <button className='manual_link' onClick={nextBtn}>
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

export default UserAdressForm;

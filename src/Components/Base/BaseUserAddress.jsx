import { useQuery } from 'react-query';
import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useMutation } from 'react-query';
import errorIcon from '../../Assets/Icon material-error.png';
import drop from '../../Assets/Path 6473@3x.png';
import headImg from '../../Assets/undraw_location_review_dmxd@3x.png';
import { useAuthContext } from '../../Context/authContext';
import { findAddress, home } from '../../Query/queryFunctions';
import BaseUserAddress2 from './BaseUserAddressForm2';

const BaseUserAddress = ({ refresh, proceed, setStep }) => {
 const [postCode, setPostCode] = useState('');
 const [manual, setManual] = useState(false);
 const [addressList, setAddressList] = useState([]);
 const [_refresh, setUnderscoreRefresh] = useState(10000);
 const [selectedAddress, setSelectedAddress] = useState('');
 const [selectedAddressArray, setSelectedAddressArray] = useState([]);

 const [line1, setLine1] = useState('');
 const [line2, setLine2] = useState('');
 const [line3, setLine3] = useState('');
 const [county, setCounty] = useState('');
 const [country, setCountry] = useState('');
 const [detailPostCode, setDetailPostCode] = useState('');
 const { user } = useAuthContext();
 const [error, setError] = useState('');

 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });

 const mutation = useMutation(findAddress, {
  onSuccess: ({ result }) => {
   setAddressList(result);
  },
 });

 const transFormText = (text) => {
  if (text) {
   return text.trim().toLowerCase();
  }
 };

 const { isLoading, isError, error: serverError, isSuccess } = mutation;
 useEffect(() => {
  const passengers = localStorage.getItem('additionalPassengers')
   ? JSON.parse(localStorage.getItem('additionalPassengers'))
   : null;
  if (user?.isAuthenticated && passengers) {
   passengers?.forEach((p) => {
    if (
     transFormText(p[0]) === transFormText(user?.firstName) &&
     transFormText(p[1]) === transFormText(user?.lastName)
    ) {
     setStep(4);
     return;
    }
    localStorage.removeItem('additionalPassengers');
   });
  }
  setUnderscoreRefresh(refresh);
 }, []);

 useEffect(() => {
  if (refresh > _refresh) {
   onSubmit();
  }
 }, [refresh]);

 const onSelectAddress = (address) => {
  setSelectedAddressArray(address);
  if (address.length > 0) {
   setSelectedAddress(address[0].line_1);
   setLine1(address[0].line_1);
   setLine2(address[0].line_2);
   setLine3(address[0].line_3);
   setCounty(address[0].county);
   setCountry(address[0].country);
   setDetailPostCode(address[0].postcode);
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

 const onSubmit = () => {
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
   proceed();
  }
 };
 if (manual) {
  return (
   <BaseUserAddress2
    refresh={refresh}
    proceed={proceed}
    setManual={setManual}
   />
  );
 } else {
  return (
   <div className='base-ua-container'>
    <div className='account_form_md'>
     <div className='account_form_sd'>
      <div className='form_head_md'>
       <div>
        <img src={headImg} alt='...' />
        <h4 className='address_header'>
         <b>{Home?.Payment?.address_form_title}</b>
        </h4>
        <p className='vfy_email_body medium' id='grey-para'>
         {Home?.Payment?.address_form_text}
        </p>
       </div>

       <div className='postal_Code acc_postal_code'>
        <input
         className='w-inp'
         id='white-center-icon'
         type='text'
         value={postCode}
         onChange={(e) => {
          setPostCode(e.target.value);
          setError({ ...error, postCode: '' });
         }}
         placeholder='e.g, 44000'
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
         <p>{serverError.error}</p>
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
           labelKey='line_1'
           options={addressList}
           placeholder='Please select your address'
           selected={selectedAddressArray}
           onChange={(data) => {
            onSelectAddress(data);
            setError({ ...error, addressList: '' });
           }}
           inputProps={{
            id: 'white-center-icon',
           }}
          />
          <img
           src={drop}
           className='trailing-icon pt-1'
           alt='...'
           id='right-move'
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
          id='white-center-icon'
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
         />
        </>
       )}
       <div className='address_footer'>
        <p className='text'> {Home?.Payment?.address_form_couldnt_find}</p>
        <button className='manual_link' onClick={() => setManual(true)}>
         {Home?.Payment?.manual_address_text}
        </button>
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 }
};

export default BaseUserAddress;

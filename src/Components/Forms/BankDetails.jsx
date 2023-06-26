import { useQuery } from 'react-query';
import { CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { useMutation } from 'react-query';
import errorIcon from '../../Assets/Icon material-error.png';
import headImg from '../../Assets/undraw_online_payments_re_y8f2@3x.png';
import { ALTERNATIVE_COMPENSATION } from '../../Constant/alternativeCompensation';
import { completeRegistration, home } from '../../Query/queryFunctions';

const BankDetails = ({ nextBtn, backBtn }) => {
 const [sortCode, setSortCode] = useState('');
 const [accountNumber, setAccountNumber] = useState('');
 const [mobileNumber, setMobileNumber] = useState('');
 const [alternative, setAlternative] = useState('');
 const [error, setError] = useState('');

 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });

 const mutation = useMutation(completeRegistration, {
  onSuccess: () => {
   localStorage.removeItem('addressDetail');
   nextBtn();
  },
 });

 const { isLoading, isError, error: serverError } = mutation;

 const validate = () => {
  let errors = {};
  let isValid = true;

  if (sortCode === '') {
   isValid = false;
   errors['sortCode'] = 'Please enter sort code.';
  }
  if (sortCode !== '') {
   let pattern = new RegExp(/^[0-9]{6}$/i);
   if (!pattern.test(sortCode)) {
    isValid = false;
    errors['sortCode'] = 'Please enter a valid sort code of length 6 .';
   }
  }
  if (accountNumber === '') {
   isValid = false;
   errors['accountNumber'] = 'Please enter account number.';
  }
  if (accountNumber !== '') {
   let pattern = new RegExp(/^[0-9]{8}$/i);
   if (!pattern.test(accountNumber)) {
    isValid = false;
    errors['accountNumber'] =
     'Please enter a valid  account number of length 8.';
   }
  }
  if (mobileNumber === '') {
   isValid = false;
   errors['mobileNumber'] = 'Please enter mobile number.';
  }
  if (mobileNumber !== '') {
   let pattern = new RegExp(/^(07)[0-9]{9}$/i);
   if (!pattern.test(mobileNumber)) {
    isValid = false;
    errors['mobileNumber'] =
     'Please enter a valid  mobile number of length 11 and starts with 07.';
   }
  }
  if (alternative === '') {
   isValid = false;
   errors['selectedACM'] = 'Please select alternative compensation method.';
  }

  setError(errors);

  return isValid;
 };
 const onNextBtn = () => {
  if (validate()) {
   const detail = JSON.parse(localStorage.getItem('addressDetail'));
   const data = {
    addressLine1: detail.line1,
    addressLine2: detail.line2,
    addressLine3: detail.line3,
    country: detail.country,
    countryCode: detail.country_value,
    county: detail.county,
    postcode: detail.postcode,
    accountNumber: accountNumber,
    alternateCompensationMethod: ALTERNATIVE_COMPENSATION.find(
     (item) => item.label === alternative
    )?.value,
    mobileNumber: mobileNumber,
    sortCode: sortCode,
   };
   mutation.mutate(data);
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
        <b>{Home?.Payment?.bank_detail_form_title}</b>
       </h4>
       <p className='vfy_email_body'>{Home?.Payment?.bank_detail_form_text}</p>
      </div>
      {isError && (
       <>
        {serverError?.message.split(',').map((error) => (
         <div className='getError_md_start'>
          <img src={errorIcon} alt='...' />
          <p>{error}</p>
         </div>
        ))}
       </>
      )}
      <div className='home_form_div_sd'>
       <input
        type='text'
        value={sortCode}
        onChange={(e) => setSortCode(e.target.value)}
        placeholder='Sort Code (6 digits)'
       />
       {error.sortCode && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.sortCode}</p>
        </div>
       )}
       <input
        type='text'
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        placeholder='Account Number (8 digits)'
       />
       {error.accountNumber && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.accountNumber}</p>
        </div>
       )}
       <input
        type='text'
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        placeholder='Mobile Number'
       />
       {error.mobileNumber && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.mobileNumber}</p>
        </div>
       )}
       <div className='info_md'>
        <select
         value={alternative !== '' ? alternative : ''}
         onChange={(e) => setAlternative(e.target.value)}
        >
         <option disabled value=''>
          Alternative Compensation Method
         </option>
         {ALTERNATIVE_COMPENSATION.map((item, index) => {
          return (
           <option key={index} value={item.label}>
            {item.label}
           </option>
          );
         })}
        </select>
        {error.selectedACM && (
         <div className='getError_md_start'>
          <img src={errorIcon} alt='...' />
          <p>{error.selectedACM}</p>
         </div>
        )}
       </div>
       <div className='stp_btns'>
        <button
         className='home_form_btn'
         onClick={onNextBtn}
         disabled={isLoading}
        >
         {!isLoading ? (
          'Sign Up'
         ) : (
          <CircularProgress size={20} color='primary' />
         )}{' '}
        </button>
        <button className='stp_back' onClick={backBtn} disabled={isLoading}>
         Back
        </button>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default BankDetails;

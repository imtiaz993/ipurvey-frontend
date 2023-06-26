import { CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useMutation } from 'react-query';
import editImg from '../../../Assets/Icon awesome-edit.png';
import errorIcon from '../../../Assets/Icon material-error.png';
import successIcon from '../../../Assets/Path 5449.png';
import {
 communicationPreferences,
 findAddress,
 update,
} from '../../../Query/queryFunctions';
import { useAuthContext } from '../../../Context/authContext';

const AccInfoForm = ({ data, edit, setEdit, oldData, valid }) => {
 const { user, setUser } = useAuthContext();
 const [success, setSuccess] = useState('');
 const [postS, setPostS] = useState(false);
 const [firstName, setFirstName] = useState(data.firstName);
 const [lastName, setLastName] = useState(data.lastName);
 const [email, setEmail] = useState(data.email);
 const [phone, setPhone] = useState(data.customerDetailsResponse.mobileNumber);
 const [postCode, setPostCode] = useState(
  data.customerDetailsResponse.postcode
 );
 const [addressList, setAddressList] = useState([]);
 const [selectedAddress, setSelectedAddress] = useState(
  data.customerDetailsResponse.addressLine1
 );
 const [selectedAddressArray, setSelectedAddressArray] = useState([
  data.customerDetailsResponse.addressLine1,
 ]);

 const [line1, setLine1] = useState(data.customerDetailsResponse.addressLine1);
 const [line2, setLine2] = useState(data.customerDetailsResponse.addressLine2);
 const [line3, setLine3] = useState(data.customerDetailsResponse.addressLine3);
 const [county, setCounty] = useState(data.customerDetailsResponse.county);
 const [country, setCountry] = useState(data.customerDetailsResponse.country);
 const [detailPostCode, setDetailPostCode] = useState('');

 const [error, setError] = useState('');

 const mutation = useMutation(findAddress, {
  onSuccess: ({ result }) => {
   setSelectedAddressArray([]);
   setSelectedAddress([]);
   setLine1('');
   setLine2('');
   setLine3('');
   setCounty('');
   setCountry('');
   setDetailPostCode('');
   setAddressList(result);
   setPostS(true);
  },
 });

 const { isLoading, isError, error: serverError, isSuccess } = mutation;

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

 const onFindAddress = (e) => {
  e.preventDefault();
  if (postCodeValidate()) {
   mutation.mutate(postCode);
  }
 };
 const checkInput = (e) => {
  const onlyDigits = e.target.value.replace(/\D/g, '');
  if (onlyDigits.length <= 11) {
   setPhone(onlyDigits);
   setError({ ...error, phone: '' });
  }
 };
 const validate = () => {
  let errors = {};
  let isValid = true;

  if (firstName === '') {
   isValid = false;
   errors['firstName'] = 'Please enter first name.';
  }

  if (lastName === '') {
   isValid = false;
   errors['lastName'] = 'Please enter last name.';
  }

  if (phone !== '') {
   let pattern = new RegExp(/^(07)[0-9]{9}$/i);
   if (!pattern.test(phone)) {
    isValid = false;
    errors['phone'] =
     'Please enter a valid  mobile number of length 11 and starts with 07.';
   }
  } else {
   isValid = false;
   errors['phone'] = 'Please enter your phone number.';
  }
  if (postCode === '') {
   isValid = false;
   errors['postCode'] = 'Please enter post code.';
  }

  if (selectedAddress === '') {
   isValid = false;
   errors['selectedAddress'] = 'Please select address.';
  }

  setError(errors);

  return isValid;
 };

 const updateMutation = useMutation(update, {
  onSuccess: (res) => setSuccess(res.message),
 });
 const cpMutatation = useMutation(communicationPreferences);

 const handleForm = (e) => {
  e.preventDefault();
  if (validate() && valid) {
   setEdit(false);
   const data = {
    ...oldData,
    firstName: firstName,
    lastName: lastName,
    mobileNumber: phone,
    addressLine1: line1,
    addressLine2: line2,
    addressLine3: line3,
    county: county,
    country: country,
    postcode: detailPostCode,
    countryCode: '',
   };
   const firstReq = {
    accountNumber: data.accountNumber,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    addressLine3: data.addressLine3,
    country: data.country,
    countryCode: data.countryCode,
    county: data.county,
    firstName: data.firstName,
    lastName: data.lastName,
    mobileNumber: data.mobileNumber,
    postcode: data.postcode,
    sortCode: data.sortCode,
    compensationType: data.compensationType,
   };

   const secondReq = {
    feedback: data.feedback,
    notifications: data.notifications,
    newsLetter: data.newsLetter,
    smartRecommendation: data.smartRecommendation,
    unsubscribe: data.unsubscribe,
   };
   setUser({
    ...user,
    firstName: firstName,
    lastName: lastName,
   });
   updateMutation.mutate(firstReq);
   cpMutatation.mutate(secondReq);
  }
 };
 return (
  <div className='AInfo_conatainer'>
   <div className='ainfo_md'>
    <div className='aInfo_head'>
     <h5 className='accInfoHeadMain'>YOUR ACCOUNT INFORMATION</h5>
     <button onClick={() => setEdit(!edit)}>
      <img src={editImg} alt='...' /> Edit
     </button>
    </div>
    <div className='acc_info_form'>
     <form action=''>
      <div className='profile_img'>
       {/* <img src={profile} alt="..." /> */}
       <button className='mob_view_infoEdit_btn'>
        <img src={editImg} alt='...' /> Edit
       </button>
      </div>
      <div className='hw_inp'>
       <div className='form-group'>
        <label for='exampleFormControlInput1' className='form-label'>
         First Name
        </label>
        <input
         type='text'
         disabled={!edit}
         value={firstName}
         placeholder='First Name'
         onChange={(e) => {
          setFirstName(e.target.value);
          setError({ ...error, firstName: '' });
         }}
        />
       </div>
       <div className='form-group'>
        <label for='exampleFormControlInput1' className='form-label'>
         Last Name
        </label>
        <input
         type='text'
         disabled={!edit}
         value={lastName}
         placeholder='Last Name'
         onChange={(e) => {
          setLastName(e.target.value);
          setError({ ...error, lastName: '' });
         }}
        />
       </div>
      </div>
      <div className='hw_inp'>
       {error.firstName && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.firstName}</p>
        </div>
       )}
       {error.lastName && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.lastName}</p>
        </div>
       )}
      </div>
      <div className='form-group'>
       <label for='exampleFormControlInput1' className='form-label'>
        Email Address
       </label>
       <input
        type='text'
        disabled={true}
        value={email}
        placeholder='Email Address'
        //    onChange={(e) => setEmail(e.target.value)}
       />
      </div>
      <div className='form-group'>
       <label for='exampleFormControlInput1' className='form-label'>
        Mobile Number
       </label>
       <input
        type='text'
        disabled={!edit}
        value={phone}
        placeholder='Mobile Number'
        onChange={(e) => checkInput(e)}
       />
      </div>
      {error.phone && (
       <div className='getError_md_start'>
        <img src={errorIcon} alt='...' />
        <p>{error.phone}</p>
       </div>
      )}
      <div className='account_form_md'>
       <div id='speci' className='account_form_sd'>
        <div className='form-group'>
         <label for='exampleFormControlInput1' className='form-label'>
          Address
         </label>
         <div className='form_head_md'>
          <div className='home_form_div_sd'>
           {edit && (
            <div className='postal_Code acc_postal_code'>
             <input
              disabled={!edit}
              type='text'
              value={postCode}
              onChange={(e) => {
               setPostCode(e.target.value);
               setError({ ...error, postCode: '' });
              }}
              placeholder='Postcode'
             />

             <button onClick={onFindAddress} disabled={isLoading || !edit}>
              {isLoading ? (
               <CircularProgress size={15} color='#FFF' />
              ) : (
               'Find Address'
              )}
             </button>
            </div>
           )}
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
           {edit && postS && (
            <Typeahead
             disabled={!edit || !isSuccess}
             id='basic-example'
             labelKey='line_1'
             options={addressList}
             placeholder='Please select your address'
             selected={selectedAddressArray}
             onChange={(address) => {
              onSelectAddress(address);
              setError({ ...error, addressList: '' });
             }}
             inputProps={{
              className: 'my-custom-classname',
             }}
            />
           )}

           {error.selectedAddress && (
            <div className='getError_md_start'>
             <img src={errorIcon} alt='...' />
             <p>{error.selectedAddress}</p>
            </div>
           )}
           <input
            disabled={!edit || !isSuccess}
            // style={{ textAlign: 'center' }}
            name=''
            id=''
            cols='30'
            rows='7'
            value={
             selectedAddress !== ''
              ? (line1 !== '' ? line1 + ', ' : '') +
                (line2 !== '' ? line2 + ', ' : '') +
                (line3 !== '' ? line3 + ', ' : '') +
                (county !== '' ? county + ', ' : '') +
                (country !== '' ? country : '') +
                (detailPostCode !== '' ? ', ' + detailPostCode : '')
              : ''
            }
           />
          </div>
         </div>
        </div>
       </div>
      </div>
      <div className='acc_sv_btn'>
       <button disabled={!edit} onClick={handleForm} className='cus_blue_btn'>
        Save
       </button>
       {success && (
        <div className='getSuccess_md_start'>
         <img src={successIcon} alt='...' />

         <p>{success}</p>
        </div>
       )}
      </div>
     </form>
    </div>
   </div>
  </div>
 );
};

export default AccInfoForm;

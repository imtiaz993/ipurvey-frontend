import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import errorIcon from '../../../Assets/Icon material-error.png';
import { ALTERNATIVE_COMPENSATION } from '../../../Constant/alternativeCompensation';
import { dashboard } from '../../../Query/queryFunctions';
const PaymentDetail = ({ data, edit, setData, oldData, setValid }) => {
 const { data: Dashboard } = useQuery('dashboard', dashboard, {
  refetchOnWindowFocus: false,
 });
 const [error, setError] = useState('');
 const [state, setState] = useState({
  Email:
   data.customerDetailsResponse?.communicationPreferencesResponse
    ?.notifications,
  sms: data.customerDetailsResponse?.communicationPreferencesResponse
   ?.unsubscribe,
  Newsletter:
   data.customerDetailsResponse?.communicationPreferencesResponse?.newsLetter,
  Feedback:
   data.customerDetailsResponse?.communicationPreferencesResponse?.feedback,
  Smart:
   data.customerDetailsResponse?.communicationPreferencesResponse
    ?.smartRecommendation,
 });
 const [sortCode, setSortCode] = useState(
  data.customerDetailsResponse.sortCode
 );
 const [accountNumber, setAccountNumber] = useState(
  data.customerDetailsResponse.accountNumber
 );
 const [alternative, setAlternative] = useState(
  ALTERNATIVE_COMPENSATION.find((item) => {
   console.log(item.label);
   console.log(data.customerDetailsResponse.alternateCompensationMethod);
   return (
    item.snake.toLowerCase() ===
    data.customerDetailsResponse.alternateCompensationMethod.toLowerCase()
   );
  })?.label
 );
 useEffect(async () => {
  setData({
   ...oldData,
   sortCode: sortCode,
   accountNumber: accountNumber,
   unsubscribe: state.sms,
   notifications: state.Email,
   newsLetter: state.Newsletter,
   feedback: state.Feedback,
   smartRecommendation: state.Smart,
   alternateCompensationMethod: ALTERNATIVE_COMPENSATION.find(
    (item) => item.label === alternative
   )?.snake,
   compensationType: ALTERNATIVE_COMPENSATION.find(
    (item) => item.label === alternative
   )?.snake,
  });
 }, [sortCode, accountNumber, alternative, state]);

 const capitalizeName = (name) => {
  return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
 };

 const checkInput = (e) => {
  const onlyDigits = e.target.value.replace(/\D/g, '');
  if (onlyDigits.length <= 6) {
   setSortCode(onlyDigits);
  }
  if (onlyDigits.length < 6 && onlyDigits.length > 0) {
   setError({ ...error, sortCode: 'Sort Code must be of 6 digits.' });
   setValid(false);
  }
  if (onlyDigits.length == 6 || onlyDigits.length == 0) {
   setError({ ...error, sortCode: '' });
   setValid(true);
  }
 };
 const checkInputA = (e) => {
  const onlyDigits = e.target.value.replace(/\D/g, '');
  if (onlyDigits.length <= 8) {
   setAccountNumber(onlyDigits);
  }
  if (onlyDigits.length !== 8 && onlyDigits.length > 0) {
   setError({ ...error, accountNumber: 'Account Number must be of 8 digits.' });
   setValid(false);
  }
  if (onlyDigits.length == 8 || onlyDigits.length == 0) {
   setError({ ...error, accountNumber: '' });
   setValid(true);
  }
 };
 const handleChange = (event) => {
  setState({ ...state, [event.target.name]: event.target.checked });
 };

 return (
  <div className='AInfo_conatainer'>
   <div className='ainfo_md'>
    <div className='payment_head'>
     <h5 className='accInfoHeadMain'>{Dashboard?.payment_detail}</h5>
    </div>
    <div className='pD_inp'>
     <div className='form-group'>
      <label for='exampleFormControlInput1' className='form-label'>
       {Dashboard?.sort_code}
      </label>
      <input
       disabled={!edit}
       type='text'
       value={sortCode}
       onChange={(e) => checkInput(e)}
       placeholder='Sort Code'
      />
     </div>
     {error.sortCode && (
      <div className='getError_md_start'>
       <img src={errorIcon} alt='...' />
       <p>{error.sortCode}</p>
      </div>
     )}
     <div className='form-group'>
      <label for='exampleFormControlInput1' className='form-label'>
       {Dashboard?.account_number}
      </label>
      <input
       disabled={!edit}
       type='text'
       value={accountNumber}
       onChange={(e) => checkInputA(e)}
       placeholder='Account Number'
      />
     </div>
     {error.accountNumber && (
      <div className='getError_md_start'>
       <img src={errorIcon} alt='...' />
       <p>{error.accountNumber}</p>
      </div>
     )}
     <div className='form-group'>
      <label for='exampleFormControlInput1' className='form-label'>
       {Dashboard?.alternative}
      </label>
      <select
       placeholder='Alternative Compensation Method'
       value={alternative}
       onChange={(e) => setAlternative(e.target.value)}
       disabled={!edit}
      >
       <option disabled value=''>
        {Dashboard?.account_number}
       </option>
       {ALTERNATIVE_COMPENSATION.map((item, index) => {
        return (
         <option key={index} value={item.label}>
          {item.label}
         </option>
        );
       })}
      </select>
     </div>
    </div>
    <div className='acc_seting_md'>
     <h5>{Dashboard?.account_setting}</h5>
     <ul className='acc_stng_ul'>
      {/* <li>
       <div>
        <h6>Email Notification</h6>
        <p>Travel disruption notification via email</p>
       </div>
       <Switch
        disabled={!edit}
        checked={state.Email === true || state.Email === 'true'}
        onChange={handleChange}
        color='primary'
        name='Email'
        inputProps={{ 'aria-label': 'primary checkbox' }}
       />
      </li> */}
      {/* <li>
       <div>
        <h6>SMS Notification</h6>
        <p>Travel disruption notification via SMS</p>
       </div>
       <Switch
        disabled={true}
        checked={state.sms}
        onChange={handleChange}
        color='primary'
        name='sms'
        inputProps={{ 'aria-label': 'primary checkbox' }}
       />
      </li> */}
      <li>
       <div>
        <h6>{Dashboard?.newsletter_title}</h6>
        <p>{Dashboard?.newsletter_setting}</p>
       </div>
       <Switch
        disabled={!edit}
        checked={state.Newsletter}
        onChange={handleChange}
        color='primary'
        name='Newsletter'
        inputProps={{ 'aria-label': 'primary checkbox' }}
       />
      </li>
      <li>
       <div>
        <h6>{Dashboard?.feedback_title}</h6>
        <p>{Dashboard?.feedback_setting}</p>
       </div>
       <Switch
        disabled={!edit}
        checked={state.Feedback}
        onChange={handleChange}
        color='primary'
        name='Feedback'
        inputProps={{ 'aria-label': 'primary checkbox' }}
       />
      </li>
      {/* <li>
       <div>
        <h6>Smart Recommendation</h6>
        <p>
         Receive recommendations on routes and/or tickets based on travel
         disruption history
        </p>
       </div>
       <Switch
        disabled={true}
        checked={state.Smart}
        onChange={handleChange}
        color='primary'
        name='Smart'
        inputProps={{ 'aria-label': 'primary checkbox' }}
       />
      </li> */}
     </ul>
     <div className='mobileView_switch_content'>
      <div>
       <h6>{Dashboard?.notification}</h6>
       <Switch
        disabled={!edit}
        checked={state.Notification}
        onChange={handleChange}
        color='primary'
        name='Notification'
        inputProps={{ 'aria-label': 'primary checkbox' }}
       />
      </div>
      <div>
       <h6>{Dashboard?.newsletter_title}</h6>
       <Switch
        disabled={!edit}
        checked={state.Newsletter}
        onChange={handleChange}
        color='primary'
        name='Newsletter'
        inputProps={{ 'aria-label': 'primary checkbox' }}
       />
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default PaymentDetail;

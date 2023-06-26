import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import errorIcon from '../../Assets/Icon material-error.png';

const BaseBooking = ({ data, refresh, proceed, disabled }) => {
 const [_refresh, setUnderscoreRefresh] = useState(10000);
 const [check, setCheck] = useState('');
 const [refNo, setrefNo] = useState('');
 const [error, setError] = useState('');

 useEffect(() => {
  setUnderscoreRefresh(refresh);
 }, []);
 useEffect(() => {
  if (check !== '') {
   disabled(!check);
   let travelModel = JSON.parse(localStorage.getItem('travelModel'));
   travelModel.check = check;
   localStorage.setItem('travelModel', JSON.stringify(travelModel));
  }
 }, [check]);

 useEffect(() => {
  if (refNo === '' && check === '') {
   let travelModel = JSON.parse(localStorage.getItem('travelModel'));
   setrefNo(travelModel.refNo);
   setCheck(travelModel.check || false);
  }
 }, []);

 useEffect(() => {
  if (refNo !== '') {
   let travelModel = JSON.parse(localStorage.getItem('travelModel'));
   travelModel.refNo = refNo;
   localStorage.setItem('travelModel', JSON.stringify(travelModel));
  }
 }, [refNo]);

 useEffect(() => {
  if (refresh > _refresh) {
   validate();
  }
 }, [refresh]);

 const validate = () => {
  let errors = {};
  let isValid = true;
  if (refNo === '') {
   isValid = false;
   errors.refNo = 'Please enter Booking Reference number';
  }
  if (check === false) {
   isValid = false;
   errors.check =
    'You must agree to Terms and Conditions and Privacy and Data Policy';
  }
  setError(errors);
  if (isValid) {
   const config = JSON.parse(localStorage.getItem('travelModel'));
   config.refNo = refNo;
   localStorage.setItem('travelModel', JSON.stringify(config));
   proceed();
  }
  return isValid;
 };
 return (
  <div className='f-h-center'>
   <div className='base-section-container'>
    <div className='stepper_form_md'>
     <div className='base-form'>
      <h2 style={{ fontSize: '1.1rem' }}>{data?.form?.one_step}</h2>
      {/* <p className='stpr_email_para'>{data?.form?.one_step_description}</p> */}
      <p className='refrence_num'>{data?.form?.booking_number}</p>
      <div className='stp_inp' id='specail'>
       <input
        id='white-center-icon'
        type='text'
        name='date'
        value={refNo}
        onChange={(e) => {
         setrefNo(e.target.value);
         setError({ ...error, refNo: '' });
        }}
        placeholder='12345678'
       />
       {error.refNo && (
        <div className='getError_md_start' id='pull-slightly'>
         <img src={errorIcon} alt='...' />
         <p>{error.refNo}</p>
        </div>
       )}
      </div>

      <div className='accept_privacy ml-4'>
       <input
        className='form-check-input'
        type='checkbox'
        name='accept'
        checked={check}
        onChange={() => {
         setCheck(!check);
         setError({ ...error, check: '' });
        }}
        id='flexCheckDefault'
       />
       <p className='terms-para' id='grey-para'>
        I agree to the iPurvey{' '}
        <Link to='/terms' target='_blank' className='stp_link'>
         Terms and Conditions{' '}
        </Link>
        and{' '}
        <Link to='/privacy' target='_blank' className='stp_link'>
         Privacy & Data Policy{' '}
        </Link>
       </p>
      </div>
      {error.check && (
       <div className='getError_md_start' id='pull-slightly'>
        <img src={errorIcon} alt='...' />
        <p>{error.check}</p>
       </div>
      )}
     </div>
    </div>
   </div>
  </div>
 );
};

export default BaseBooking;

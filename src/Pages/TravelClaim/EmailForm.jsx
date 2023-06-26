import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import emailIcon from '../../Assets/Group 4946@3x.png';
import headImg from '../../Assets/undraw_Order_confirmed_re_g0if_light.png';
import errorIcon from '../../Assets/Icon material-error.png';
import confetti from '../../Assets/Animations/Confetti.mp4';

const EmailForm = ({ data, refresh, proceed, eligible }) => {
 const [email, setEmail] = useState('');
 const [error, setError] = useState('');
 const [_refresh, setUnderscoreRefresh] = useState(10000);

 useEffect(() => {
  setUnderscoreRefresh(refresh);
  eligible(true);
 }, []);

 useEffect(() => {
  let { email: existingEmail } = JSON.parse(
   localStorage.getItem('travelModel')
  );
  if (existingEmail) setEmail(existingEmail);
 }, []);

 useEffect(() => {
  if (refresh > _refresh) {
   onSubmit();
  }
 }, [refresh]);

 const mail_validate = () => {
  const trimed_email = email.trim();

  if (trimed_email === '') {
   return [false, 'Please enter email address.'];
  }
  if (trimed_email !== '') {
   let pattern = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   );
   if (!pattern.test(trimed_email)) {
    return [false, 'Please enter a valid email address.'];
   }
  }
  return [true, ''];
 };

 const validate = () => {
  let errors = {};
  let isValid = true;
  const mail_validation = mail_validate();

  if (mail_validation[0] === false) {
   errors['email'] = mail_validation[1];
   isValid = false;
  }

  setError(errors);

  return isValid;
 };

 const onSubmit = () => {
  if (validate()) {
   const existing = JSON.parse(localStorage.getItem('travelModel'));
   existing.email = email.trim();
   localStorage.setItem('travelModel', JSON.stringify(existing));
   proceed();
  }
 };

 return (
  <div className='base-form-container pt-0'>
   <div className='stepper_form_md'>
    <div className='stepper_form'>
     <div className='confetti'>
      <ReactPlayer
       width={372}
       height={215}
       playing={true}
       controls={false}
       loop={true}
       muted={true}
       url={confetti}
      />
     </div>
     <img src={headImg} alt='...' />
     <h2>{data?.form?.email}</h2>
     <p className='stpr_email_para'>{data?.form?.email_description}</p>
     <div className='stp_inp'>
      <img id='email-icon' src={emailIcon} alt='...' />
      <input
       id='white-center-icon'
       type='email'
       name='email'
       placeholder='Email Address'
       onChange={(e) => {
        setEmail(e.target.value);
        if (mail_validate()[0] === true) setError({ ...error, email: '' });
       }}
       value={email}
      />
     </div>
     {error.email && (
      <div className='getError_md_start' id='center-err'>
       <img src={errorIcon} alt='...' />
       <p>{error.email}</p>
      </div>
     )}
    </div>
   </div>
  </div>
 );
};

export default EmailForm;

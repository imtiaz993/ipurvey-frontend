import { useQuery } from 'react-query';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import errorIcon from '../Assets/Icon material-error.png';
import { getInTouchData, layout } from '../Query/queryFunctions';
import CopyRight from './CopyRight';
import './style.css';

const Footer = ({ data }) => {
 const [userName, setUserName] = useState('');
 const [email, setEmail] = useState('');
 const [message, setMessage] = useState('');
 const [error, setError] = useState('');
 const { data: Layout } = useQuery('layout', layout, {
  refetchOnWindowFocus: false,
 });

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

 const name_validate = () => {
  const trimed_userName = userName.trim();
  if (trimed_userName === '') {
   return [false, 'Please enter name.'];
  }
  return [true, ''];
 };

 const message_validate = () => {
  const trimed_message = message.trim();
  if (trimed_message === '') {
   return [false, 'Please enter your message.'];
  } else if (trimed_message.length < 10 || trimed_message.length > 300) {
   return [false, 'Text should be between 10 and 300 characters'];
  }
  return [true, ''];
 };

 const validate = () => {
  let errors = {};
  let isValid = true;
  const mail_validation = mail_validate();
  const name_validation = name_validate();
  const message_validation = message_validate();
  if (mail_validation[0] === false) {
   errors['email'] = mail_validation[1];
   isValid = false;
  }
  if (name_validation[0] === false) {
   errors['userName'] = name_validation[1];
   isValid = false;
  }
  if (message_validation[0] === false) {
   errors['message'] = message_validation[1];
   isValid = false;
  }

  setError(errors);

  return isValid;
 };

 const mutation = useMutation(getInTouchData, {
  onSuccess: (_) => {
   toast.success(
    <div>
     All Done <br /> <span className='smol'>Thanks for your email</span>
    </div>,
    {
     theme: 'colored',
     position: 'top-center',
     autoClose: 5000,
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
    }
   );
   setUserName('');
   setEmail('');
   setMessage('');
  },
 });

 const { isLoading, mutate } = mutation;

 const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
   const payload = {
    email: email.trim(),
    name: userName.trim(),
    msg: message.trim(),
   };
   mutate(payload);
  }
 };
 return (
  <>
   <div className='footer_main_container'>
    <div className='footer_main_div'>
     <div className='footer_link_div'>
      <div className='footer_links'>
       <div className='links_footer'>
        <h6>iPurvey</h6>
        <ul className='link_ul'>
         <li>
          <Link className='f_links' to='/account-info'>
           {Layout?.footer?.account_link}{' '}
          </Link>
         </li>
         <li>
          <Link className='f_links' to='blog'>
           {Layout?.footer?.blog_link}
          </Link>
         </li>
         {/* <li>
          <Link className='f_links' to='/partners'>
           Partners
          </Link>
         </li> */}
         <li>
          <Link className='f_links' to='/career'>
           {Layout?.footer?.career_link}
          </Link>
         </li>
        </ul>
       </div>
       <div className='links_footer'>
        <h6>{Layout?.footer?.support}</h6>
        <ul className='link_ul'>
         <li>
          <Link className='f_links' to='/about'>
           {Layout?.footer?.about_link}{' '}
          </Link>
         </li>
         <li>
          <Link className='f_links' to='/contact'>
           {Layout?.footer?.contact_link}{' '}
          </Link>
         </li>
         {/* <li>
          <Link className='f_links' to='/contact'>
           Help Center
          </Link>
         </li> */}
        </ul>
       </div>
       <div className='links_footer'>
        <h6>{Layout?.footer?.legal}</h6>
        <ul className='link_ul'>
         <li className='w-160'>
          <Link className='f_links' to='/privacy'>
           {Layout?.footer?.policy_link}
          </Link>
         </li>
         <li>
          <Link className='f_links' to='/terms'>
           {Layout?.footer?.terms_link}
          </Link>
         </li>
         <li>
          <Link className='f_links' to='/faq'>
           {Layout?.footer?.faq_link}
          </Link>
         </li>
        </ul>
       </div>
      </div>
      <p className='footer_para1'>{data?.footer?.content}</p>
     </div>
     <div className='footer_form_div'>
      <h3 className='form_head'>{Layout?.footer?.get_in_touch}</h3>
      <form className='footer_form'>
       <input
        type='text'
        placeholder='Full Name'
        value={userName}
        onChange={(e) => {
         setUserName(e.target.value);
         if (name_validate()[0] === true) setError({ ...error, userName: '' });
        }}
       />
       {error.userName && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.userName}</p>
        </div>
       )}
       <input
        type='email'
        placeholder='Email Address'
        value={email}
        onChange={(e) => {
         setEmail(e.target.value);
         if (mail_validate()[0] === true) setError({ ...error, email: '' });
        }}
       />
       {error.email && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.email}</p>
        </div>
       )}
       <textarea
        name=''
        id=''
        cols='10'
        rows='5'
        placeholder='Message'
        value={message}
        onChange={(e) => {
         setMessage(e.target.value);
         if (message_validate()[0] === true)
          setError({ ...error, message: '' });
        }}
       />
       {error.message && (
        <div className='getError_md_start'>
         <img src={errorIcon} alt='...' />
         <p>{error.message}</p>
        </div>
       )}
       <div className='sent_btn_div'>
        <button
         disabled={isLoading}
         className='foter_sent_btn'
         onClick={(e) => handleSubmit(e)}
        >
         Send
        </button>
       </div>
      </form>
     </div>
    </div>
   </div>
   <CopyRight data={data} />
  </>
 );
};

export default Footer;

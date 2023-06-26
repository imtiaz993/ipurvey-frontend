import { useState } from 'react';
import ReactPlayer from 'react-player';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import aboutRec1 from '../../Assets/Group 4066.png';
import msg from '../../Assets/Group 4946@2x.png';
import office from '../../Assets/Icon awesome-building@2x.png';
import mob from '../../Assets/Icon ionic-ios-call@2x.png';
import errorIcon from '../../Assets/Icon material-error.png';
import path from '../../Assets/Path 4974.png';
import Loader from '../../Components/Loader';
import Footer from '../../Layout/Footer';
import { contact, getInTouchData, layout } from '../../Query/queryFunctions';
import { API_URL } from '../../Utils/constants';
import './Contact.css';

const Contact = () => {
 const [userName, setUserName] = useState('');
 const [email, setEmail] = useState('');
 const [message, setMessage] = useState('');
 const [error, setError] = useState('');

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
  } else if (/^\d+$/.test(trimed_userName)) {
   return [false, 'Name cannot be numbers.'];
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
 const { data: Contact } = useQuery('contact', contact, {
  refetchOnWindowFocus: false,
 });
 const { data: Layout } = useQuery('layout', layout, {
  refetchOnWindowFocus: false,
 });

 if (Contact && Layout) {
  return (
   <>
    <div className='contact_container'>
     <div className='about_container'>
      <div className='about_content abt_contetn'>
       <div className='about_left_content1 ab_left_c1'>
        <h2 className=' fw-bold about_head'>
         {Contact?.header_section?.title}
        </h2>
        <p className='about_para'>{Contact?.header_section?.description}</p>
        <div className='email_div'>
         <img src={email} alt='' />
         <span className='email_span'>{Contact?.header_section?.email}</span>
        </div>
       </div>
       <div className='about_right_content1 abt_right_c1'>
        <img
         className='contact_img1'
         src={
          `${API_URL.CMS}${Contact?.header_section?.image?.url}` ?? {
           aboutRec1,
          }
         }
         alt={Contact?.header_section?.image?.name}
        />
       </div>
      </div>
      <div className='contact_section2'>
       <div className='about_sec2'>
        <div className='contact_form_main_div'>
         <div className='contact_video_img'>
          <ReactPlayer
           width='100%'
           className='video'
           playing={true}
           controls={true}
           loop={true}
           muted={true}
           url={Contact?.get_in_touch?.video_url}
          />

          <p className='video_desc'>{Contact?.get_in_touch?.description}</p>
         </div>
         <img className='contact_path' src={path} alt='' />
         <div className='contact_form_sec'>
          <h3>Get in touch!</h3>
          <form className='contact_form'>
           <input
            className='name_inp'
            type='text'
            placeholder='Full Name'
            value={userName}
            onChange={(e) => {
             setUserName(e.target.value);
             if (name_validate()[0] === true)
              setError({ ...error, userName: '' });
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
            className='conatact_inp'
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
            cols='30'
            rows='7'
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
           <button
            className='contact_send_btn'
            disabled={isLoading}
            onClick={(e) => handleSubmit(e)}
           >
            Send
           </button>
          </form>
         </div>
        </div>
       </div>
      </div>
      <div className='contact_map_sec'>
       <h3>{Contact?.our_office?.title}</h3>
       <div className='contact_map_flex d-flex'>
        <iframe
         title='bg'
         src={Contact?.our_office?.map_address}
         width='600'
         height='450'
         style={{ border: 0 }}
         loading='lazy'
         className='map_img'
        ></iframe>
        <div className='_contact_links'>
         <h5>{Contact?.our_office?.head_office}</h5>
         <div className='addres_div mt-3'>
          <img src={office} alt='' />
          <span>{Contact?.our_office?.location}</span>
         </div>
         <div>
          <img src={mob} alt='' />
          <span className='mt-2'>{Contact?.our_office?.phone_ho}</span>
         </div>
         <div>
          <img src={msg} alt='' />
          <span className='mt-2'>{Contact?.our_office?.mail}</span>
         </div>
         <h4>{Contact?.our_office?.buissness_support_title}</h4>
         <div>
          <img src={mob} alt='' />
          <span>{Contact?.our_office?.buissness_support_phone}</span>
         </div>
         <h4>{Contact?.our_office?.client_support_title}</h4>
         <div>
          <img src={mob} alt='' />
          <span>{Contact?.our_office?.client_support_phone}</span>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
    <Footer data={Layout} />
   </>
  );
 } else return <Loader />;
};

export default Contact;

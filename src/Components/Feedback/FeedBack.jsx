import { useQuery } from 'react-query';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import starlight from '../../Assets/Icon awesome-star light.svg';
import star from '../../Assets/Icon awesome-star.svg';
import arrow from '../../Assets/Path 5678.svg';
import { useAuthContext } from '../../Context/authContext';
import { publicFeedback, submitFeedback, layout } from '../../Query/queryFunctions';
import errorIcon from '../../Assets/Icon material-error.png';
import './FeedBack.css';

const FeedBack = () => {
 const { user } = useAuthContext();
 const [chatOpen, setChatOpen] = useState(false);
 const [error, setError] = useState('');
 const [experience, setExperience] = useState(0);
 const [support, setSupport] = useState(0);
 const [trouble, setTrouble] = useState(0);
 const [feedback, setFeedback] = useState('');
 const chatRef = useRef(null);

 const { data: Layout } = useQuery('layout', layout, {
    refetchOnWindowFocus: false,
   });
 const handleChatOpen = () => {
  setChatOpen(true);
 };
 const mutation = useMutation(
  user.isAuthenticated ? submitFeedback : publicFeedback,
  {
   onSuccess: (response) => {
    if (response.success) {
     toast.success(response.message, {
      theme: 'colored',
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
     });
    }
   },
  }
 );
 const handleSubmit = () => {
  if (experience === 0 || support === 0 || trouble === 0) {
   setError('Please select all rating options');
  } else if (
   feedback.trim() !== '' &&
   (feedback.trim().length < 10 || feedback.trim().length > 300)
  ) {
   setError('Feedback should be between 10 and 300 characters');
  } else {
   const data = {
    customerSupport: support,
    experience: experience,
    manageAccount: trouble,
    reviewText: feedback.trim(),
   };
   mutation.mutate(data);
   setExperience(0);
   setTrouble(0);
   setSupport(0);
   setFeedback('');
   setError('');
   setChatOpen(false);
  }
 };

 const hideChat = () => {
  setChatOpen(false);
 };

 function handler(e) {
  if (chatRef.current && !chatRef.current.contains(e.target)) {
   hideChat();
  }
 }
 useEffect(() => {
  if (chatOpen) {
   document.addEventListener('click', handler);
   return () => document.removeEventListener('click', handler);
  }
 }, [chatOpen]);

 return (
  <>
   <div className='feedback'>
    {chatOpen ? (
     <div ref={chatRef} className='feedback_content'>
      <div className='row'>
       <span>
        <strong>{Layout?.feedback?.feeback_title}</strong>
       </span>
      </div>
      <div className='row mt-2'>
       <p style={{ color: '#2E58A6' }}>
       {Layout?.feedback?.feedback_text}
       </p>
      </div>
      <div className='row mt-3'>
       <span>{Layout?.feedback?.feedback_rate1_text}</span>
      </div>
      <div className='row mt-3'>
       <div className='d-flex align-items-center justify-content-between fd_star'>
        <img
         src={experience >= 1 ? star : starlight}
         alt='...'
         onClick={() => setExperience(1)}
        />
        <img
         src={experience >= 2 ? star : starlight}
         alt='...'
         onClick={() => setExperience(2)}
        />
        <img
         src={experience >= 3 ? star : starlight}
         alt='...'
         onClick={() => setExperience(3)}
        />
        <img
         src={experience >= 4 ? star : starlight}
         alt='...'
         onClick={() => setExperience(4)}
        />
        <img
         src={experience >= 5 ? star : starlight}
         alt='...'
         onClick={() => setExperience(5)}
        />
       </div>
      </div>
      <div className='row mt-3'>
       <p>{Layout?.feedback?.feedback_rate2_text}</p>
      </div>
      <div className='row mt-3'>
       <div className='d-flex align-items-center justify-content-between fd_star'>
        <img
         src={support >= 1 ? star : starlight}
         alt='...'
         onClick={() => setSupport(1)}
        />
        <img
         src={support >= 2 ? star : starlight}
         alt='...'
         onClick={() => setSupport(2)}
        />
        <img
         src={support >= 3 ? star : starlight}
         alt='...'
         onClick={() => setSupport(3)}
        />
        <img
         src={support >= 4 ? star : starlight}
         alt='...'
         onClick={() => setSupport(4)}
        />
        <img
         src={support >= 5 ? star : starlight}
         alt='...'
         onClick={() => setSupport(5)}
        />
       </div>
      </div>
      <div className='row mt-3'>
       <p>{Layout?.feedback?.feedback_rate3_text}</p>
      </div>
      <div className='row mt-3'>
       <div className='d-flex align-items-center justify-content-between fd_star'>
        <img
         src={trouble >= 1 ? star : starlight}
         alt='...'
         onClick={() => setTrouble(1)}
        />
        <img
         src={trouble >= 2 ? star : starlight}
         alt='...'
         onClick={() => setTrouble(2)}
        />
        <img
         src={trouble >= 3 ? star : starlight}
         alt='...'
         onClick={() => setTrouble(3)}
        />
        <img
         src={trouble >= 4 ? star : starlight}
         alt='...'
         onClick={() => setTrouble(4)}
        />
        <img
         src={trouble >= 5 ? star : starlight}
         alt='...'
         onClick={() => setTrouble(5)}
        />
       </div>
      </div>
      <div className='row mt-3'>
       <p>{Layout?.feedback?.feedback_write_text}</p>
      </div>
      <div className='row mt-2'>
       <textarea
        value={feedback}
        name='feedback'
        onChange={(e) => setFeedback(e.target.value)}
       ></textarea>
      </div>
      {error !== '' && (
       <div className='getError_md_start'>
        <img src={errorIcon} alt='...' />
        <p>{error}</p>
       </div>
      )}
      <div className='mt-2'>
       <button className='home_form_btn' onClick={handleSubmit}>
        Submit
       </button>
      </div>
     </div>
    ) : null}
    <div
     className='feedback_btn'
     onClick={() => {
      !chatOpen ? handleChatOpen() : hideChat();
     }}
    >
     <img
      style={{ transform: chatOpen ? 'rotate(-90deg)' : 'rotate(90deg)' }}
      src={arrow}
      alt='feedback-btn'
     />
     <span>Feedback</span>
    </div>
   </div>
  </>
 );
};

export default FeedBack;

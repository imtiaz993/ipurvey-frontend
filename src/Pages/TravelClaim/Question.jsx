import headImg from '../../Assets/undraw_notify_re_65on.png';
import { useHistory } from 'react-router-dom';
const Question = ({ proceed }) => {
 const history = useHistory();
 const onRedirect = (redirect) => {
  history.push(redirect);
 };
 return (
  <div className='steper_form_container'>
   {/* <div className='stepper_form_md'>
    <div className='stepper_form'>
     <img src={headImg} alt='...' />
     <h2>Are you sure?</h2>
     <div className='stp_para'>
      <p>
       Are you sure you don’t want to go ahead with automatic claim
       compensation?
      </p>
     </div>
     <div className='stp_btns'>
      <button
       className='home_form_btn'
       id='thicc'
       onClick={() => onRedirect('/')}
      >
       Yes, return to homepage!
      </button>
      <button className='stp_back' id='thicc' onClick={proceed}>
       No start automatic claim compensation
      </button>
     </div>
    </div>
   </div> */}
  </div>
 );
};

export default Question;

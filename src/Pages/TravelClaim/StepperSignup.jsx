import { Link } from 'react-router-dom';
import hover from '../../Assets/Component 41 – 1.png';

const StepperSignup = () => {
 return (
  <div className='steper_form_container'>
   {/* <div className='account_form_md'>
    <div className='account_form_sd'>
     <div className='form_head_md'>
      <div>
       <h4>
        <b>Sign Up for iPurvey!</b>
       </h4>
      </div>
     </div>

     <div className='home_form_div_sd'>
      <div className='postal_Code acc_postal_code'>
       <input type='text' placeholder='Postal Code' />
       <button>Find Address</button>
      </div>
      <input type='text' placeholder='Address' />
      <div className='stepr_sort_code'>
       <input type='text' placeholder='Account Number' />
       <input type='text' placeholder='Sort code' />
      </div>
      <div className='hoverI_togle acc_hover_togle'>
       <input
        type='text'
        placeholder='Alternative Compensation Method'
        className='acc_hover_input'
       />
       <div className='hoverI_togle_img'>
        <img className='popover__title' src={hover} alt='...' />
        <div className='popover__content'>
         <p className='popover__message'>
          'Default payment method is BACS. In the event BACS payment method can
          not be requested, we will request for your chosen alternative
          compensation method'
         </p>
        </div>
       </div>
      </div>

      <button className='home_form_btn'>Sign Up</button>
      <div className='notMember_para'>
       <p>
        Already a member?{' '}
        <Link className='link' to='/login'>
         login
        </Link>{' '}
       </p>
      </div>
     </div>
    </div>
   </div> */}
  </div>
 );
};

export default StepperSignup;

import { useQuery } from 'react-query';
import orderConfirmed from '../../Assets/undraw_Order_confirmed_re_g0if.png';
import { Link } from 'react-router-dom';
import { home } from '../../Query/queryFunctions';

const PaymentThankYou = ({ data }) => {
 const AlreadyPaid = JSON.parse(sessionStorage.getItem('alreadyPaid'));
 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });
 return (
  <>
   <div className='payment_thank'>
    <div className='row'>
     <div className='col-lg-12'>
      <div className='ps_img'>
       <img src={orderConfirmed} alt='...' />
      </div>
     </div>
    </div>
    <div className='row mt-4'>
     <div className='ps_text'>
      <h2>
       {!AlreadyPaid ? data?.Payment?.thank_you : Home?.Payment?.all_set}
      </h2>
      <p>
       {!AlreadyPaid
        ? data?.Payment?.thank_you_description
        : Home?.Payment?.already_subscribe}
      </p>
     </div>
    </div>
    <div className='row'>
     <div className='col-lg-12'>
      <Link to='/dashboard'>
       <button
        onClick={() => {
         if (AlreadyPaid) sessionStorage.removeItem('alreadyPaid');
        }}
        className='home_form_btn'
       >
        {Home?.Payment?.continue_dashboard}
       </button>
      </Link>
     </div>
    </div>
    {!AlreadyPaid && (
     <div className='row mt-3'>
      <div className='col-lg-12'>
       <Link to='/' className='hl_text'>
        {Home?.Payment?.retrieve_another}
       </Link>
      </div>
     </div>
    )}
   </div>
  </>
 );
};

export default PaymentThankYou;

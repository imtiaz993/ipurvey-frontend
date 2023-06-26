import orderFailed from '../../Assets/undraw_access_denied_re_awnf.png';
import { useHistory } from 'react-router-dom';

const PaymentFailed = ({ data }) => {
 const history = useHistory();
 return (
  <>
   <div className='payment_success payment_failed'>
    <div className='row'>
     <div className='col-lg-12'>
      <div className='ps_img'>
       <img src={orderFailed} alt='...' />
      </div>
     </div>
    </div>
    <div className='row mt-4'>
     <div className='ps_text'>
      <h2>{data?.Payment?.failed}</h2>
      <p>{data?.Payment?.failed_description}</p>
     </div>
    </div>

    <div className='row'>
     <div className='col-lg-12'>
      <button onClick={() => history.goBack()} className='home_form_btn'>
       Retry Transcation
      </button>
     </div>
    </div>
   </div>
  </>
 );
};

export default PaymentFailed;

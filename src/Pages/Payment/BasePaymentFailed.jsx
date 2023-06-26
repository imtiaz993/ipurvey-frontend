import orderFailed from '../../Assets/undraw_access_denied_re_awnf.png';

const PaymentFailed = ({ data, setStep, step }) => {
 return (
  <>
   <div className='base-failed-container'>
    <img src={orderFailed} alt='...' />
    <h2 className='ft-14 medium mt-5'>{data?.Payment?.failed}</h2>
    <p id='grey-para' className='mt-2 align-center'>
     {data?.Payment?.failed_description}
    </p>
    <div className='row'>
     <div className='col-lg-12 mt-3'>
      <button onClick={() => setStep(step - 1)} className='home_form_btn'>
       Retry Transcation
      </button>
     </div>
    </div>
   </div>
  </>
 );
};

export default PaymentFailed;

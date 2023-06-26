import { useHistory } from 'react-router';
import arrowLeft from '../../Assets/Icon feather-arrow-left.png';
import CheckoutForm from '../../Components/Stripe/CheckoutForm';

const PaymentStripe = ({
 data,
 product,
 setLProceed,
 journey,
 ii,
 proceed,
}) => {
 const history = useHistory();
 return (
  <>
   <div className='b_payment_stripe'>
    <div className='pstripe_head'>
     <img
      style={{ cursor: 'pointer' }}
      onClick={() => (!journey ? history.goBack() : setLProceed(false))}
      src={arrowLeft}
      alt='...'
     />
     <h1>Stripe</h1>
    </div>

    <CheckoutForm
     data={data}
     product={product}
     ii={ii}
     proceed={proceed}
     journey={journey}
    />
    <div className='mt-3'></div>
   </div>
  </>
 );
};

export default PaymentStripe;

import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import errorIcon from '../../Assets/Icon material-error.png';
import { API_URL } from '../../Utils/constants';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../Context/authContext';
import './Stripe.css';
import { usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';

export default function CheckoutForm(props) {
 const [error, setError] = useState('');
 const [cardNumber, setCardNumber] = useState('');
 const [cardExpiry, setCardExpiry] = useState('');
 const [cardCvc, setCardCvc] = useState('');
 const [loading, setLoading] = useState(false);
 const history = useHistory();
 const { user } = useAuthContext();
 const {
  meta,
  getCardNumberProps,
  getExpiryDateProps,
  getCVCProps,
  getCardImageProps,
 } = usePaymentInputs();

 const getToken = async () => {
  setLoading(true);
  setError('');

  const options = {
   method: 'POST',
   url: `${API_URL.REVENUE}/payment/create-token`,
   headers: { 'content-type': 'application/json' },
   data: {
    cardNumber: cardNumber,
    customerReference: props?.data?.user?.customerNumber,
    cvc: cardCvc,
    expiryMonth: cardExpiry.slice(0, 2),
    expiryYear: cardExpiry.slice(-2),
   },
  };
  axios
   .request(options)
   .then((response) => {
    if (response.data.status === 'true') handleSubmit(response.data.token);
   })
   .catch((error) => {
    setLoading(false);
    setError(error);
   });
 };

 const handleSubmit = async (tokenId) => {
  if (!user?.customerNumber) {
   history.push('/user-address');
  }
  const options = {
   method: 'POST',
   url: `${API_URL.REVENUE}/payment/make`,
   headers: { 'content-type': 'application/json' },
   data: {
    paymentOperatorId: '2',
    merchantId: '1001',
    productId: props?.product?.id,
    returnUrl: `${
     window.location.origin + window.location.pathname
    }?payment=true`,
    bookingReference: props?.data?.travelModel?.refNo ?? '',
    travelMode: props?.product?.category,
    channelId: '1',
    iPAddress: props?.data?.location.query,
    instructionIdentification: props.ii ?? '',
    customerReference: user?.customerNumber,
    token: tokenId,
    email: user?.email,
   },
  };
  axios
   .request(options)
   .then((response) => {
    if (response.data.status === '0057') {
     if (!props.journey) {
      sessionStorage.setItem('alreadyPaid', true);
      history.push('/plan/payment-thank');
     } else {
      props.proceed();
      props.proceed();
     }
    } else if (response.data.paymentStatus === 'fail') {
     setLoading(false);
     props.journey ? props.proceed() : history.push('/plan/payment-failed');
    } else {
     confirmPayment(response.data.transactionId);
    }
   })
   .catch((error) => {
    setLoading(false);
    setError(error);
   });
 };

 const confirmPayment = (transactionId) => {
  const options = {
   method: 'POST',
   url: `${API_URL.REVENUE}/payment/finalize`,
   headers: { 'content-type': 'application/json' },
   data: { transactionId },
  };
  axios
   .request(options)
   .then((response) => {
    setLoading(false);
    if (response.data.message === 'Transaction-Success') {
     if (props.journey) {
      props.proceed();
      props.proceed();
     } else {
      history.push('/plan/payment-thank');
     }
    } else if (response.data.message === 'Transaction-Failed') {
     props.journey ? props.proceed() : history.push('/plan/payment-failed');
    }
   })
   .catch((error) => {
    setLoading(false);
    setError(error);
   });
 };
 return (
  <div className='center-flex-col'>
   <div className='stripe-form'>
    <div className='svg-nu'>
     <svg {...getCardImageProps({ images })} />
     <input
      className='stripe-input stripe-cn'
      id='stripe-cn'
      {...getCardNumberProps({
       onChange: (e) => setCardNumber(e.target.value),
      })}
      value={cardNumber}
     />
    </div>
    <div className='exp-cvc'>
     <input
      className='stripe-input stripe-ce'
      {...getExpiryDateProps({
       onChange: (e) => setCardExpiry(e.target.value),
      })}
      value={cardExpiry}
     />
     <input
      className='stripe-input stripe-cv'
      {...getCVCProps({ onChange: (e) => setCardCvc(e.target.value) })}
      value={cardCvc}
     />
    </div>
   </div>
   {meta.isTouched && meta.error && (
    <span className='stripe-error'>{meta.error}</span>
   )}
   {error && (
    <div className='getError_md_start'>
     <img src={errorIcon} alt='...' />
     <p>{error}</p>
    </div>
   )}
   <div className='row mt-3'>
    <div className='col-lg-12'>
     <button
      disabled={loading || meta.error}
      onClick={getToken}
      className='home_form_btn'
      id={loading || meta.error ? 'stripe-disabled' : 'green-btn'}
     >
      {loading ? (
       <CircularProgress
        style={{ marginTop: '5px', marginRight: '20px', marginLeft: '20px' }}
        size={18}
        color='#FFF'
       />
      ) : (
       <span>Continue to pay</span>
      )}
     </button>
    </div>
   </div>
  </div>
 );
}

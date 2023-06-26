import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import arrowLeft from '../../Assets/Icon feather-arrow-left.png';
import paypalIcon from '../../Assets/PayPal_logo_logotype_emblem.svg';
import { useAuthContext } from '../../Context/authContext';
import { API_URL } from '../../Utils/constants';

const PaymentPaypal = (props) => {
 const [data, setData] = useState(null);
 const [status, setStatus] = useState(null);
 const { user } = useAuthContext();

 const handleSubmit = () => {
  setStatus(null);
  localStorage.setItem('transactionId', data.transactionId);
  if (props.journey) {
   sessionStorage.setItem('paypal', true);
   localStorage.setItem('P_OBJ', JSON.stringify(props.data));
   localStorage.setItem('Prod', JSON.stringify(props.product));
   localStorage.setItem('ProdL', JSON.stringify(props.productL));
   localStorage.setItem('OCH', JSON.stringify(props.theData));
  }
  window.location.href = data?.url;
 };

 useEffect(() => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
   get: (searchParams, prop) => searchParams.get(prop),
  });
  if (params.payment) {
   const transactionId = localStorage.getItem('transactionId');
   if (transactionId) {
    const options = {
     method: 'POST',
     url: `${API_URL.REVENUE}/payment/finalize`,
     headers: { 'content-type': 'application/json' },
     data: { transactionId },
    };

    axios
     .request(options)
     .then((response) => {
      if (response.data.message === 'Transaction-Success') {
       sessionStorage.removeItem('paypal');
       localStorage.removeItem('transactionId');
       localStorage.removeItem('P_OBJ');
       localStorage.removeItem('Prod');
       localStorage.removeItem('ProdL');
       localStorage.removeItem('OCH');
       if (props.journey) {
        props.proceed();
        props.proceed();
       } else {
        history.push('/plan/payment-thank');
       }
      } else if (response.data.message === 'Transaction-Failed') {
       sessionStorage.removeItem('paypal');
       localStorage.removeItem('transactionId');
       localStorage.removeItem('P_OBJ');
       localStorage.removeItem('Prod');
       localStorage.removeItem('ProdL');
       localStorage.removeItem('OCH');
       props.journey ? props.proceed() : history.push('/plan/payment-failed');
      }
     })
     .catch((error) => {
      setStatus(false);
      console.error(error);
     });
   } else {
    history.push(window.location.pathname);
   }
  } else {
   if (!user?.customerNumber) {
    history.push('/user-address');
   }
   const options = {
    method: 'POST',
    url: `${API_URL.REVENUE}/payment/make`,
    headers: { 'content-type': 'application/json' },
    data: {
     paymentOperatorId: '1',
     merchantId: '1001',
     productId: props.product.id,
     returnUrl: `${
      window.location.origin + window.location.pathname
     }?payment=true`,
     bookingReference: props?.data?.travelModel?.refNo ?? '',
     travelMode: props?.product?.category,
     channelId: '1',
     iPAddress: props?.data?.location.query,
     instructionIdentification: props.ii ?? '',
     customerReference: user?.customerNumber,
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
     } else {
      setStatus(true);
      setData(response.data);
     }
    })
    .catch((error) => {
     setStatus(false);
     console.log(error);
    });
  }
 }, []);

 const history = useHistory();
 return (
  <>
   <div className='b_payment_stripe payment'>
    <div className='pstripe_head'>
     <img
      style={{ cursor: 'pointer' }}
      onClick={() =>
       !props.journey ? history.goBack() : props.setLProceed(false)
      }
      src={arrowLeft}
      alt='...'
     />
     <img className='paypal_img' src={paypalIcon} alt='...' />
    </div>
    <div className='row mt-3'>
     <div className='pay-text col-lg-12 p-0 d-flex justify-content-center'>
      <span>{props?.data?.Payment?.paypal_description}</span>
     </div>
    </div>
    <div className='mt-5 justify-content-center d-flex'>
     <button
      onClick={handleSubmit}
      className='pay_form_btn'
      disabled={!status || status == null}
     >
      {status == null ? (
       <CircularProgress
        style={{ marginTop: '5px', marginRight: '20px', marginLeft: '20px' }}
        size={18}
        color='#FFF'
       />
      ) : status ? (
       <span>Proceed with checkout</span>
      ) : (
       <span>Error Occured</span>
      )}
     </button>
    </div>
    <div className='mt-5'></div>
   </div>
  </>
 );
};

export default PaymentPaypal;

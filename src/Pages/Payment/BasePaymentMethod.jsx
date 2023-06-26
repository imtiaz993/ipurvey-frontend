import { useEffect, useState } from 'react';
import stripeIcon from '../../Assets/Group 4070.svg';
import paypalIcon from '../../Assets/Group 4071.svg';
import tick from '../../Assets/Group 872.png';
import PaymentStripe from './PaymentStripe';
import PaymentPaypal from './PaymentPaypal';

const options = {
 paypal: {
  name: 'Pay with Paypal',
  img: paypalIcon,
 },
 stripe: {
  name: 'Pay with Stripe',
  img: stripeIcon,
 },
};

const BasePaymentMethod = ({
 data,
 product,
 refresh,
 proceed,
 disabled,
 theData,
 productL,
 madePayment,
 subscribed,
}) => {
 const [active, setActive] = useState('paypal');
 const [localProceed, setLocalProceed] = useState(false);
 const [_refresh, setUnderscoreRefresh] = useState(10000);
 useEffect(() => {
  setUnderscoreRefresh(refresh);
  setLocalProceed(madePayment);
 }, []);

 useEffect(() => {
  if (refresh > _refresh) {
   if (subscribed) {
    proceed();
    proceed();
   } else setLocalProceed(true);
  }
 }, [refresh]);

 useEffect(() => {
  if (localProceed) disabled(true);
  else disabled(false);
 }, [localProceed]);

 if (!localProceed) {
  return (
   <>
    <div className='paylan_method'>
     <div className='pm_head' id='pypm_head'>
      <div>
       <h2>
        {subscribed
         ? 'You are already subscribed to this plan'
         : 'Select a payment method'}
       </h2>
      </div>
      <p>
       {subscribed
        ? 'Press continue to proceed to checkout'
        : 'Select a payment method to continue!'}
      </p>
     </div>

     <div className='row '>
      {!subscribed && (
       <div className='col-lg-12'>
        {Object.entries(options).map((el, index) => (
         <div
          key={index}
          onClick={() => setActive(el[0])}
          className={el[0] === active ? 'paypal_box active_box' : 'paypal_box'}
         >
          <div>
           <img src={el[1].img} alt='...' />
           <span>{el[1].name}</span>
          </div>
          <div>
           {el[0] === active && (
            <img className='option-tick' src={tick} alt='...' />
           )}
          </div>
         </div>
        ))}
       </div>
      )}
     </div>
    </div>
   </>
  );
 } else {
  if (active == 'paypal') {
   return (
    <PaymentPaypal
     path
     ii={theData.instructionIdentification}
     setLProceed={setLocalProceed}
     journey={true}
     theData={theData}
     data={data}
     product={product}
     productL={productL}
     proceed={proceed}
    />
   );
  } else {
   return (
    <PaymentStripe
     path
     ii={theData.instructionIdentification}
     setLProceed={setLocalProceed}
     journey={true}
     data={data}
     product={product}
     proceed={proceed}
    />
   );
  }
 }
};

export default BasePaymentMethod;

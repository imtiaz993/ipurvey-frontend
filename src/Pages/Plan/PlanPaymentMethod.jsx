import stripeIcon from '../../Assets/Group 4070.svg';
import paypalIcon from '../../Assets/Group 4071.svg';
import tick from '../../Assets/Group 872.png';
// import bankIcon from '../../Assets/Group 891.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import wArrow from '../../Assets/Icon feather-arrow-rightw.png';
import OrderSummary from '../../Components/PlanComponent/OrderSummary';

const options = {
 paypal: {
  name: 'Pay with Paypal',
  img: paypalIcon,
  route: '/plan/payment-paypal',
 },
 stripe: {
  name: 'Pay with Stripe',
  img: stripeIcon,
  route: '/plan/payment-stripe',
 },
 // bank: {
 //   name: "Pay by bank transfer",
 //   img: bankIcon,
 //   route: "/planpayment/bank-select",
 // },
};

const PlanPaymentMethod = ({ Home, data, product }) => {
 const [active, setActive] = useState('paypal');
 return (
  <>
   <div className='pay_method plan_pay_method'>
    <OrderSummary
     topText={Home?.Payment?.order_summary}
     claimText={Home?.Payment?.single_claim}
     valueA={`£ ${product.price}`}
     totalText='Total'
     valueB={`£ ${data.userSubscription ? '0' : product.price}`}
    />

    <div className='row'>
     <div className='pp_content'>
      <div className='row'>
       <div className='col-lg-12'>
        <div className='pm_head'>
         <div>
          <h2>
           {data.userSubscription
            ? Home?.Payment?.already_subscribe
            : Home?.Payment?.select_payment}
          </h2>
         </div>
         <p>
          {data.userSubscription
           ? Home?.Payment?.proceed
           : Home?.Payment?.payment_to_continue}
         </p>
        </div>
       </div>
      </div>

      <div className='row '>
       {!data.userSubscription && (
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
       {/* <div className="row mt-3">
                <p>Authorise the payment from your bank account.</p>
                <p>
                  Bank account to bank account transfer which includes fee of
                  £0.25p per transaction to complete the bank transfer payment.
                </p>
                <p>Your bank may not currently support this payment method</p>
              </div> */}
      </div>
      <div className='row mt-3'>
       <div className='col-lg-12 d-flex justify-content-center'>
        <Link
         to={!data.userSubscription && options[active].route}
         className='home_form_btn'
        >
         Continue <img src={wArrow} alt='...' />
        </Link>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

export default PlanPaymentMethod;

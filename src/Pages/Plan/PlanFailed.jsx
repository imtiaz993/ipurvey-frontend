import OrderSummary from '../../Components/PlanComponent/OrderSummary';
import PaymentFailed from '../Payment/PaymentFailed';
const PlanFailed = ({ data, product }) => {
 return (
  <>
   <div className='pay_method plan_pay_method plan_thank'>
    <OrderSummary
     topText='Order Summary'
     claimText='Single Claim Initiation Fee'
     valueA={`£ ${product.price}`}
     totalText='Total'
     valueB={`£ ${product.price}`}
    />
    <div className='row'>
     <div className='pp_content'>
      <PaymentFailed data={data} />
     </div>
    </div>
   </div>
  </>
 );
};

export default PlanFailed;

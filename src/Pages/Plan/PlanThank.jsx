import OrderSummary from '../../Components/PlanComponent/OrderSummary';
import PaymentThank from '../Payment/PaymentThankYou';
const PlanThank = ({ Home, data, product }) => {
 return (
  <>
   <div className='pay_method plan_pay_method plan_thank'>
    <OrderSummary
     topText={Home?.Payment?.order_summary}
     claimText={Home?.Payment?.single_claim}
     valueA={`£ ${product.price}`}
     totalText='Total'
     valueB={`£ ${product.price}`}
    />
    <div className='row'>
     <div className='pp_content'>
      <PaymentThank data={data} />
     </div>
    </div>
   </div>
  </>
 );
};

export default PlanThank;

import OrderSummary from '../../Components/PlanComponent/OrderSummary';
import PaymentStripe from '../Payment/PaymentStripe';
const PlanStripe = ({ Home, data, product }) => {
 return (
  <>
   <div className='pay_method plan_pay_method plan_stripe'>
    <OrderSummary
     topText={Home?.Payment?.order_summary}
     claimText={Home?.Payment?.single_claim}
     valueA={`£ ${product.price}`}
     totalText='Total'
     valueB={`£ ${product.price}`}
    />
    <div className='row'>
     <div className='pp_content'>
      <PaymentStripe path data={data} product={product} />
     </div>
    </div>
   </div>
  </>
 );
};

export default PlanStripe;

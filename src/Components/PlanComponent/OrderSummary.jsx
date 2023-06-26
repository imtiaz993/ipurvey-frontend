const OrderSummary = (props) => {
 return (
  <>
   <div className='row mb-3 order_summary'>
    <div className='col-lg-12'>
     <div className='tr_details_1'>
      <span>{props.topText}</span>
     </div>
    </div>
    <div className='col-lg-12'>
     <div className='tr_details_2'>
      <div>
       <span>{props.claimText}</span>
       <span>{props.valueA}</span>
      </div>
      <hr />
      <div>
       <span>{props.totalText}</span>
       <span>{props.valueB}</span>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

export default OrderSummary;

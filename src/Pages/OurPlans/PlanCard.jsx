const PlanCard = () => {
 return (
  <>
   <div className='our_plan_row'>
    <div className='row '>
     {our_planData.map((d, i) => {
      return (
       <div
        key={i}
        className='col-2 col-sm-2 col-md-2 col-lg-2 p-0'
        onClick={() => handleSelect(d)}
       >
        <div
         className={
          activePlan === d.id
           ? 'active_fib feature_item_box'
           : 'feature_item_box'
         }
        >
         {activePlan === d.id ? (
          <div className='popular_text'>Popular</div>
         ) : null}
         <div className='fib_head'>
          <div className='row'>
           <h5>{d.name}</h5>
          </div>
          <div className='row'>
           <h2>{d.price}</h2>
          </div>
          <div className='row'>
           <span>{d.transaction}</span>
          </div>
         </div>
         <div className='row'>
          {d.planImg.map((v, i) => {
           return (
            <div key={i} className='col-lg-12'>
             <div className='flist'>
              <img src={v} alt='...' />
             </div>
            </div>
           );
          })}
         </div>
         <div className='row'>
          <button className='home_form_btn'>{d.btnText}</button>
         </div>
        </div>
       </div>
      );
     })}
    </div>
   </div>
  </>
 );
};

export default PlanCard;

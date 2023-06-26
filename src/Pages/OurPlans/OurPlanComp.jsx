import { useHistory } from 'react-router-dom';
import cross from '../../Assets/cross.png';
import currentPlanImg from '../../Assets/current_plan.png';
import question from '../../Assets/question-subs.png';
import { useAuthContext } from '../../Context/authContext';
import tick from '../../Assets/Path 5267.svg';
import closeM from '../../Assets/close-modal.png';
import { useQuery } from 'react-query';
import Popup from 'reactjs-popup';
import './OurPlans.css';
import 'reactjs-popup/dist/index.css';
import { layout, home } from '../../Query/queryFunctions';
import Footer from '../../Layout/Footer';

const OurPlans = ({ plans, features, activePlanId }) => {
 const { data: Layout } = useQuery('layout', layout, {
  refetchOnWindowFocus: false,
 });
 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });
 const history = useHistory();
 const { user } = useAuthContext();
 let featuresId = [];
 const handleProceed = (strapiId) => {
  if (strapiId) {
   sessionStorage.setItem('strapiId', strapiId);
  } else {
   sessionStorage.removeItem('strapiId');
  }
  if (!user?.isAuthenticated) {
   history.push('/login');
  } else {
   history.push('/plan');
  }
 };

 return (
  <>
   <div className={' our_plans_section'}>
    <div className='partner_header'>
     <h2>{Home?.Payment?.our_plan_title}</h2>
    </div>
    <div className='our_plan_hero'>
     <div className='row'>
      <div className='col-8 col-sm-6 col-md-4 col-lg-3'>
       <div className='feature_box'>
        <h2>{Home?.Payment?.features_title}</h2>
        <div className='row w-100 gx-0'>
         {features?.map((feature) => {
          featuresId.push(feature._id);
          return (
           <div className='col-lg-12'>
            <div className='feature_list'>
             <span>{feature.title}</span>
            </div>
           </div>
          );
         })}
        </div>
       </div>
      </div>
      <div className='col-4 col-sm-6 col-md-8 col-lg-9 our_plan_col'>
       <div className='our_plan_row'>
        <div className='row'>
         {plans?.map((plan, i) => {
          return (
           <div
            key={plan._id}
            className={`plan_ca col-2 col-sm-2 col-md-2 col-lg-2 p-0 ${
             activePlanId === plan?._id && 'activePlan'
            }`}
           >
            <div
             className={
              plan.is_popular
               ? 'active_fib feature_item_box'
               : 'feature_item_box'
             }
            >
             {plan.is_popular ? (
              <div className='popular_text'>{Home?.Payment?.popular_title}</div>
             ) : null}

             <div
              className={`fib_head ${
               activePlanId === plan?._id && 'current_plan'
              }`}
             >
              <img className='cp_img' src={currentPlanImg} alt='...' />
              <div className='row'>
               <h5>{plan.title}</h5>
              </div>
              <div className='row'>
               <h2>{plan.price}</h2>
              </div>
              <div className='row'>
               <span>{plan.small_txt}</span>
              </div>
             </div>
             <div className='row'>
              {featuresId.map((_id, pos) => {
               let included = false;
               let _featureId = [];
               plan.features.map((_feature) => _featureId.push(_feature._id));
               if (_featureId.includes(featuresId[pos])) included = true;
               return (
                <div key={_id} className='col-lg-12'>
                 <div
                  className={included ? 'flist bg-white' : 'flist bg-light'}
                 >
                  <img src={included ? tick : cross} alt='...' />
                 </div>
                </div>
               );
              })}
             </div>
             {plan.Type === 'OneOff' ||
             plan.Type === 'FreeTrial' ||
             activePlanId === plan?._id ? (
              <div className='row'>
               <button
                className={`home_form_btn ${
                 activePlanId === plan?._id && 'bg-white-button'
                }`}
                onClick={() => history.push('/')}
               >
                {Home?.Payment?.get_started}
               </button>
              </div>
             ) : (
              <Popup
               modal
               trigger={
                <div className='row'>
                 <button className='home_form_btn'>
                  {' '}
                  {Home?.Payment?.get_started}
                 </button>
                </div>
               }
              >
               {(close) => (
                <div className='the-ques-div'>
                 <img src={closeM} className='close' onClick={close} />
                 <img src={question} className='the-ques' />
                 <h2 className='the-title-modal'>{Home?.form?.popup_text}</h2>
                 <div className='modal-btns-q'>
                  <button
                   className='home_form_btn'
                   onClick={() => history.push('/')}
                  >
                   {Home?.Payment?.yes_button}
                  </button>
                  <button
                   className='home_form_btn'
                   onClick={() => handleProceed(plan._id)}
                  >
                   {Home?.Payment?.no_button}
                  </button>
                 </div>
                </div>
               )}
              </Popup>
             )}
            </div>
           </div>
          );
         })}
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
   <Footer data={Layout} />
  </>
 );
};

export default OurPlans;

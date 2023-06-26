import { useQuery } from 'react-query';
import Loader from '../../../Components/Loader';
import { features, plans, dashboard } from '../../../Query/queryFunctions';
import OurPlanComp from '../../OurPlans/OurPlanComp';
import BackHeader from '../BackHeader';
import MiniDrawer from '../Sidebar';
import './style.css';

const SubscriptionManager = () => {
 const { data: Features } = useQuery('features', features, {
  refetchOnWindowFocus: false,
 });
 const { data: Plans } = useQuery('plans', plans, {
  refetchOnWindowFocus: false,
 });
 const { data: Dashboard } = useQuery('dashboard', dashboard, {
  refetchOnWindowFocus: false,
 });

 if (Features && Plans) {
  return (
   <div className='subcription_manage_contianer'>
    <div className='subscript_manage_md'>
     <div className='subscript_manage_sd'>
      <div className='db_left_content'>
       <MiniDrawer />
      </div>
      <div className='subcript_right_content_main'>
       <BackHeader head={Dashboard?.manage_subscription} link='/dashboard' />
       <div className='subscript_mng_head'>
        <h2>{Dashboard?.manage_subscription}</h2>
       </div>
       <div className='sbc_manage_md'>
        <OurPlanComp plans={Plans} features={Features} />
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 } else return <Loader />;
};
export default SubscriptionManager;

import { useQuery } from 'react-query';
import BackHeader from '../BackHeader';
import MiniDrawer from '../Sidebar';
import ChangePassword from './ChangePassword';
import './style.css';
import { dashboard } from '../../../Query/queryFunctions';

const SecuritySetting = () => {
 const { data: Dashboard } = useQuery('dashboard', dashboard, {
  refetchOnWindowFocus: false,
 });
 return (
  <div className='accInfo_container'>
   <div className='accInfo_md'>
    <div className='accInfo_sd'>
     <div className='db_left_content'>
      <MiniDrawer />
     </div>
     <div className='accInfo_rigth_md'>
      <div className='acc_back_link'>
       <BackHeader head={Dashboard?.security_setting} link='/dashboard' />
      </div>
      <div className='acc_info_sd'>
       <ChangePassword />
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default SecuritySetting;

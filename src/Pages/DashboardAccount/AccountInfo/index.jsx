import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import Loader from '../../../Components/Loader';
import BackHeader from '../BackHeader';
import MiniDrawer from '../Sidebar';
import AccInfoForm from './AccInfoForm';
import PaymentDetail from './PaymentDetail';
import { dashboard } from '../../../Query/queryFunctions';
import './style.css';

import { useMutation } from 'react-query';
import { getUserData } from '../../../Query/queryFunctions';

const AccountInformation = () => {
 const [user, setUser] = useState();
 const [data, setData] = useState({});
 const [edit, setEdit] = useState(false);
 const [valid, setValid] = useState(true);
 const { data: Dashboard } = useQuery('dashboard', dashboard, {
  refetchOnWindowFocus: false,
 });
 const userMutation = useMutation(getUserData, {
  onSuccess: (response) => setUser(response),
 });

 useEffect(async () => {
  await userMutation.mutate();
 }, []);

 if (user) {
  return (
   <div className='accInfo_container'>
    <div className='accInfo_md'>
     <div className='accInfo_sd'>
      <div className='db_left_content'>
       <MiniDrawer />
      </div>
      <div className='accInfo_rigth_md'>
       <div className='acc_back_link'>
        <BackHeader head={Dashboard?.view_acc_info} link='/dashboard' />
       </div>
       <div className='acc_info_sd'>
        <div className='_accountInfo_form_container'>
         <AccInfoForm
          data={user}
          edit={edit}
          setEdit={setEdit}
          oldData={data}
          valid={valid}
         />
        </div>
        <div className='pD_container'>
         <PaymentDetail
          data={user}
          edit={edit}
          setData={setData}
          oldData={data}
          setValid={setValid}
         />
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 } else return <Loader />;
};

export default AccountInformation;

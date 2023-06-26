import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useractivity } from '../../../Query/queryFunctions';
import BackHeader from '../BackHeader';
import MiniDrawer from '../Sidebar';
import MobViewActivityCard from './MobViewActivityCard';
import ShowDetail from './ShowDetail';
import { dashboard } from '../../../Query/queryFunctions';
import './style.css';
import Table from './Table';

const AccountActivity = () => {
 const [showDetail, setShowDetail] = useState([]);
 const [data, setData] = useState([]);
 const { data: Dashboard } = useQuery('dashboard', dashboard, {
  refetchOnWindowFocus: false,
 });
 const mutaiton = useMutation(useractivity, {
  onSuccess: (response) => {
   setData(response.content);
   setShowDetail(response.content[0]);
  },
  onError: (err) => {
   console.log(err);
  },
 });

 const selectRow = (row) => {
  setShowDetail(row);
 };

 useEffect(async () => {
  await mutaiton.mutate();
 }, []);

 return (
  <div className='acc_activity_container'>
   <div className='acc_activity_md'>
    <div className='acc_activity_sd'>
     <div className='db_left_content'>
      <MiniDrawer />
     </div>
     <div className='acc_activity_right_md'>
      <BackHeader head={Dashboard?.account_activity} link='/dashboard' />
      <h5 className='acc_activity_head'>{Dashboard?.account_activity}</h5>
      <div className='acc_activity_right_content'>
       <div className='acc_active_table_md'>
        <Table data={data} onClick={selectRow} />
       </div>
       <div className='sDetail_container'>
        <ShowDetail detailData={showDetail} reportBtn />
       </div>
      </div>
      <div className='mob_view_activity_card'>
       <MobViewActivityCard data={data} />
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default AccountActivity;

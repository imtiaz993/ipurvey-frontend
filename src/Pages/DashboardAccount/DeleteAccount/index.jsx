import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { useAuthContext } from '../../../Context/authContext';
import { updateRegistrationStatus } from '../../../Query/queryFunctions';
import MiniDrawer from '../Sidebar';
import './style.css';

import leaving from '../../../Assets/undraw_feeling_blue_4b7q.png';
import closeM from '../../../Assets/close-modal.png';
import Loader from '../../../Components/Loader';
import BackHeader from '../BackHeader';
import { API_URL } from '../../../Utils/constants';

const DeleteAccount = () => {
 const [data, setData] = useState();
 const [reason, setReason] = useState('Loading...');
 const [confirm, setConfirm] = useState(false);
 const history = useHistory();
 const { setUser } = useAuthContext();
 const onRedirect = (redirect) => {
  history.push(redirect);
 };

 useEffect(async () => {
  const dashboard = await axios.get(`${API_URL.CMS}/dashoard`);
  const layout = await axios.get(`${API_URL.CMS}/layout`);
  setData([dashboard.data, layout.data]);
  setReason(dashboard.data[0]?.leaving_options[0]?.text);
 }, []);

 const mutation = useMutation(updateRegistrationStatus, {
  onSuccess: () => {
   setUser({ isAuthenticated: false, token: null, data: {} });
   localStorage.removeItem('user');
   history.push('/');
  },
 });

 const handleSubmit = () => {
  mutation.mutate({ status: 'CLOSED', statusChangeReason: reason });
 };
 if (data) {
  return (
   <div className='accInfo_container'>
    <div className='accInfo_md'>
     <div className='accInfo_sd'>
      <div className='db_left_content'>
       <MiniDrawer />
      </div>
      <div className='accInfo_rigth_md'>
       <div className='acc_back_link'>
        <BackHeader head={data[0]?.close_account} link='/dashboard' />
       </div>
       <div className='acc_del_row'>
        <div className='dlt_acc_md del_acc_para'>
         <h6>{data[0]?.close_account}</h6>
         <p>{data[1]?.auth?.delete_account}</p>
        </div>

        <div className='acc_info_sd'>
         <div className='dltAcc_container'>
          <div className='ss_md'>
           <div className='ss_sd'>
            <h6 className='leaving_head'>{data[0]?.why_leaving}</h6>
            <div className='leaving_img'>
             <img src={leaving} alt='...' />
            </div>
            <div className='dlt_acc_md dlt_slct'>
             <select name='' id='' onChange={(e) => setReason(e.target.value)}>
              {data[0]?.leaving_options?.map((option, id) => (
               <option key={id} value={option.text}>
                {option.text}
               </option>
              ))}
             </select>
            </div>
            <div className='ss_btn'>
             <button
              className='cus_blue_btn dlt_red'
              onClick={() => setConfirm(true)}
             >
              {data[0]?.close_acc_small}
             </button>
            </div>
            {confirm && (
             <div className='the-ft-div'>
              <img
               src={closeM}
               className='close'
               onClick={() => setConfirm(false)}
              />
              <img src={leaving} className='the-ft' />
              <h2 className='the-title-modal red  the-ft-btn'>
               {data[1]?.account_closure?.title}
              </h2>
              <p className='the-ft-para' id='grey-para'>
               {data[1]?.account_closure?.description}
              </p>
              <button
               className='home_form_btn'
               id='red-btn'
               onClick={handleSubmit}
              >
               {data[0]?.confirm_closure}
              </button>
              <button
               onClick={() => onRedirect('/')}
               className='stp_back medium the-ft-btn'
              >
               {data[0]?.return_home}
              </button>
             </div>
            )}
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 } else return <Loader />;
};

export default DeleteAccount;

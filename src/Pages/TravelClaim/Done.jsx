import { useQuery } from 'react-query';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import tick from '../../Assets/Animations/Checkmark.mp4';
import { home } from '../../Query/queryFunctions';

export default function Done() {
 const history = useHistory();
 const onRedirect = (redirect) => {
  history.push(redirect);
 };
 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });
 return (
  <div className='base-done-container'>
   <ReactPlayer
    width={104}
    height={117}
    playing={true}
    controls={false}
    loop={true}
    muted={true}
    url={tick}
   />
   <h2 id='h2'>{Home?.Payment?.payment_done_title}</h2>
   <div className='mb-2'></div>
   <p className='txt-center' id='grey-para'>
    {Home?.Payment?.payment_done_text}
   </p>
   <div className='f-h-center'>
    <button className='base-done-btn' onClick={() => onRedirect('/dashboard')}>
     {Home?.OCH?.go_to_dashboard}
    </button>
    <button
     id='grey-para'
     className='stp_back medium mt-3'
     onClick={() => onRedirect('/')}
    >
     {Home?.OCH?.return_to_home}
    </button>
   </div>
  </div>
 );
}

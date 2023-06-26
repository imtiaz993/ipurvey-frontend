import ProgressBar from '@ramonak/react-progress-bar';
import { memo } from 'react';
import ReactPlayer from 'react-player';
import loading from '../../Assets/Animations/GettingTicket.mp4';
const TLoading = () => {
 return (
  <div className='Tloading'>
   <div className='Tloader'>
    <ReactPlayer
     width={478}
     height={198}
     playing={true}
     controls={false}
     loop={true}
     muted={true}
     url={loading}
    />
   </div>
   <ProgressBar
    initCompletedOnAnimation={0}
    completed={100}
    maxCompleted={100}
    bgColor='#2E58A6'
    height='7px'
    width='478px'
    isLabelVisible={false}
    baseBgColor='#e4e9f6'
    transitionDuration='20s'
    animateOnRender={true}
   />
   <h1>Just a moment please!</h1>
   <p>Please wait while we retrieve the journey details!</p>
  </div>
 );
};
const MemoizedSubComponent = memo(TLoading);
export default MemoizedSubComponent;

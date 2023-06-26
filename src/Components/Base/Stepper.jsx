import ReactPlayer from 'react-player';
import bar from '../../Assets/Animations/LoadingBar.mp4';
import ball from '../../Assets/Animations/LoadingBall.mp4';
import unloaded from '../../Assets/unloaded.png';
import loaded from '../../Assets/loaded.png';
import ring from '../../Assets/ringo.png';
import tick from '../../Assets/Group 872.png';

export default function Stepper({ success }) {
 return (
  <div className='base-stepper'>
   <div className='flex-column  base-center'>
    {success != 1 ? (
     <img src={tick} alt='Tick' className='base-tick' />
    ) : (
     <ReactPlayer
      width={'82px'}
      height={'50px'}
      playing={true}
      controls={false}
      loop={true}
      muted={true}
      url={ball}
      className='ballo'
     />
    )}
    <span className='semibold'>Eligibility</span>
   </div>
   {success != 1 ? (
    <img src={loaded} />
   ) : (
    <ReactPlayer
     width={'337px'}
     playing={true}
     controls={false}
     loop={true}
     muted={true}
     url={bar}
    />
   )}
   <div className='flex-column  base-center'>
    {success == 2 ? (
     <ReactPlayer
      width={'82px'}
      height={'50px'}
      playing={true}
      controls={false}
      loop={true}
      muted={true}
      url={ball}
      className='ballo'
     />
    ) : success == 1 ? (
     <img src={ring} className='ringo' />
    ) : (
     <img src={tick} alt='Tick' className='base-tick' />
    )}
    <span className='semibold'>Passenger Info</span>
   </div>
   {success == 2 ? (
    <ReactPlayer
     width={'337px'}
     playing={true}
     controls={false}
     loop={true}
     muted={true}
     url={bar}
    />
   ) : success == 1 ? (
    <img src={unloaded} />
   ) : (
    <img src={loaded} />
   )}
   <div className='flex-column ml-2 base-center'>
    {success == 3 ? (
     <img src={tick} alt='Tick' className='base-tick ' />
    ) : success == 4 ? (
     <ReactPlayer
      width={'82px'}
      height={'50px'}
      playing={true}
      controls={false}
      loop={true}
      muted={true}
      url={ball}
      className='ballo'
     />
    ) : (
     <img src={ring} className='ringo' />
    )}
    <span className='semibold'>Finish</span>
   </div>
  </div>
 );
}

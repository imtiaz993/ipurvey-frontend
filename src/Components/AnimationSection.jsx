import useWebAnimations from '@wellyshen/use-web-animations';
import ReactMarkdown from 'react-markdown';
import './Style/Animation.css';
import train from '../Assets/Group 4050@2x.png';
import airplane from '../Assets/Group 3870@2x.png';
import tree from '../Assets/Group 3848.png';
import road from '../Assets/Group 3975.png';
import sectionLogo from '../Assets/Group 4938.png';
import tick from '../Assets/Path 5449.png';

const AnimationSection = ({ data, forms }) => {
 const { ref } = useWebAnimations({
  keyframes: {
   transform: 'translateX( -1100px)', // Move by 500px
  },
  animationOptions: {
   delay: 1000, // Start with a 500ms delay
   duration: 5000, // Run for 1000ms
   iterations: Number.MAX_SAFE_INTEGER, // Repeat once
   direction: 'alternate', // Run the animation forwards and then backwards
   easing: 'ease-in-out', // Use a fancy timing function
  },
 });

 return (
  <div>
   <div className='main_sect_animation_div'>
    <div className='animation_content_div'>
     {/* home first left section  */}
     <div className='animation_para_div'>
      <div className='animatio_head_logo'>
       <img src={sectionLogo} alt='...' />
       <h3>{data?.header?.title}</h3>
      </div>
      <p>{data?.header?.description}</p>
      <ReactMarkdown>{data?.header?.info_text}</ReactMarkdown>
      <div className='ipurvey_points'>
       {data?.header?.ticks[0] ? (
        <div className='ip_point'>
         <img src={tick} alt='...' />
         <p>{data.header.ticks[0]?.tick}</p>
        </div>
       ) : (
        ''
       )}
       {data?.header?.ticks[1] ? (
        <div className='ip_point ip_1_point'>
         <img src={tick} alt='...' />
         <p>{data.header.ticks[1]?.tick}</p>
        </div>
       ) : (
        ''
       )}
      </div>

      <div className='ipurvey_points'>
       {data?.header?.ticks[2] ? (
        <div className='ip_point'>
         <img src={tick} alt='...' />
         <p>{data.header.ticks[2]?.tick}</p>
        </div>
       ) : (
        ''
       )}
       {data?.header?.ticks[3] ? (
        <div className='ip_point'>
         <img src={tick} alt='...' />
         <p>{data.header.ticks[3]?.tick}</p>
        </div>
       ) : (
        ''
       )}
      </div>
      <div className='ipurvey_points'>
       {data?.header?.ticks[4] ? (
        <div className='ip_point'>
         <img src={tick} alt='...' />
         <p>{data.header.ticks[4]?.tick}</p>
        </div>
       ) : (
        ''
       )}
       {data?.header?.ticks[5] ? (
        <div className='ip_point'>
         <img src={tick} alt='...' />
         <p>{data.header.ticks[5]?.tick}</p>
        </div>
       ) : (
        ''
       )}
      </div>
      <div className='ipurvey_points'>
       {data?.header?.ticks[6] ? (
        <div className='ip_point'>
         <img src={tick} alt='...' />
         <p>{data.header.ticks[6]?.tick}</p>
        </div>
       ) : (
        ''
       )}
       {data?.header?.ticks[7] ? (
        <div className='ip_point'>
         <img src={tick} alt='...' />
         <p>{data.header.ticks[7]?.tick}</p>
        </div>
       ) : (
        ''
       )}
      </div>
     </div>
     <img src={airplane} className='airplane App-logo' alt='...' />
     {forms}
    </div>
    <img className='tree_img' src={tree} alt='...' />
    <div className='station_img'>
     <img className='train_img' ref={ref} src={train} alt='...' />
     <img className='road_img' src={road} alt='...' />
    </div>
   </div>
  </div>
 );
};

export default AnimationSection;

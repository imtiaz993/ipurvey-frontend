import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
const VideoSection = ({ data }) => {
 return (
  <div>
   <div className='_home_video_div'>
    <h3>{data?.video?.title}</h3>
    <ReactMarkdown>{data?.video?.description}</ReactMarkdown>
    <ReactPlayer
     width='100%'
     className='video'
     playing={true}
     controls={true}
     loop={true}
     muted={true}
     url={data?.video?.video_link}
    />
   </div>
  </div>
 );
};
export default VideoSection;

import loading from '../../Assets/Animations/Loading.mp4';
import ReactPlayer from 'react-player';

export default function BLoading() {
 return (
  <>
   <ReactPlayer
    playing={true}
    controls={false}
    loop={true}
    muted={true}
    url={loading}
   />
  </>
 );
}

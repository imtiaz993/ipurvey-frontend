import { useQuery } from 'react-query';
import AnimationSection from '../../Components/AnimationSection';
import GetApp from '../../Components/GetApp';
import StartedForm from '../../Components/HomeComp/StartedForm';
import VideoSection from '../../Components/HomeComp/VideoSection';
import WhyIpurvey from '../../Components/HomeComp/WhyIpurvey';
import Loader from '../../Components/Loader';
import Footer from '../../Layout/Footer';
import { home, layout } from '../../Query/queryFunctions';
import './Home.css';
import '../Partners/Partners.css';

const Home = () => {
 const { data: Layout } = useQuery('layout', layout, {
  refetchOnWindowFocus: false,
 });
 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });
 console.group(Home);
 if (Layout && Home) {
  return (
   <>
    <div className='home_container'>
     <AnimationSection data={Home} forms={<StartedForm data={Home} />} />
     <WhyIpurvey data={Home} />
     <VideoSection data={Home} />
     <GetApp data={Layout} />
    </div>
    <Footer data={Layout} />
   </>
  );
 } else {
  return <Loader />;
 }
};

export default Home;

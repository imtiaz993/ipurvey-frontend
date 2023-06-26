import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AnimationSection from '../../Components/AnimationSection';
import Loader from '../../Components/Loader';
import Stepper from './Stepper';
import './TravelClaim.css';
const TravelClaim = () => {
 const history = useHistory();
 useEffect(async () => {
  if (!JSON.parse(localStorage.getItem('travelModel'))) {
   history.push('/');
  }
 }, []);
 const { data } = useQueryy('home', home, {
  refetchOnWindowFocus: false,
 });
 if (data) {
  return (
   <div className='home_steper_animation'>
    <AnimationSection data={data} forms={<Stepper data={data} />} />
   </div>
  );
 } else {
  return <Loader />;
 }
};

export default TravelClaim;

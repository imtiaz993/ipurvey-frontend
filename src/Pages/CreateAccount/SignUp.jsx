import { useQuery } from 'react-query';
import AnimationSection from '../../Components/AnimationSection';
import SignUpForm from '../../Components/Forms/SignUpForm';
import Loader from '../../Components/Loader';
import Footer from '../../Layout/Footer';
import { home, layout } from '../../Query/queryFunctions';
import './style.css';

const SignUp = () => {
 const { data: Layout } = useQuery('layout', layout, {
  refetchOnWindowFocus: false,
 });
 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });

 if (Layout && Home) {
  return (
   <>
    <div className='user_acc_container'>
     <div className='user_acc_md user_acc_s_md'>
      <div className='user_acc_left_md'>
       <AnimationSection data={Home} forms={<SignUpForm data={Layout} />} />
      </div>
     </div>
    </div>
    <Footer data={Layout} />
   </>
  );
 } else {
  return <Loader />;
 }
};

export default SignUp;

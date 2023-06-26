import LoginForm from '../../Components/Forms/LoginForm';
import Loader from '../../Components/Loader';
import Footer from '../../Layout/Footer';
import './style.css';

import { useQuery } from 'react-query';
import AnimationSection from '../../Components/AnimationSection';
import { home, layout } from '../../Query/queryFunctions';

const Login = () => {
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
     <div className='user_acc_md'>
      <div className='user_acc_left_md'>
       <AnimationSection data={Home} forms={<LoginForm data={Layout} />} />
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

export default Login;

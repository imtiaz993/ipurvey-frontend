import { useQuery } from 'react-query';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import wArrow from '../../Assets/Icon feather-arrow-rightw.png';
import Loader from '../../Components/Loader';
import PlanList from '../../Components/PlanComponent/PlanList';
import { useAuthContext } from '../../Context/authContext';
import { API_URL } from '../../Utils/constants';
import '../Payment/Payment.css';
import './Plan.css';
import PlanFailed from './PlanFailed';
import PlanPaymentMethod from './PlanPaymentMethod';
import PlanPaypal from './PlanPaypal';
import PlanStripe from './PlanStripe';
import PlanThank from './PlanThank';
import tick from '../../Assets/Group 872.png';
import { getUserData, home } from '../../Query/queryFunctions';
import { useMutation } from 'react-query';
import SubNav from '../../Layout/SubNav';

const Plan = () => {
 const history = useHistory();
 const [activeOption1, setActiveOption1] = useState(false);
 const [activeOption2, setActiveOption2] = useState(true);
 const [userSubscription, setUserSubscription] = useState();
 const [selectedType, setSelectedType] = useState(false);
 const [options, setOptions] = useState(true);
 const [transferred, setTransferred] = useState(false);
 const [loading, setLoading] = useState(true);
 const [products, setProducts] = useState();
 const [product, setProduct] = useState();
 const [data, setData] = useState();
 const { user, setUser } = useAuthContext();

 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });

 const userMutation = useMutation(getUserData, {
  onSuccess: (response) => {
   setUser({
    ...user,
    firstName: response.firstName,
    lastName: response.lastName,
    email: response.email,
    image: response.imageUrl,
    firstTime: response.firsTimeLogin,
    earlyBird: response.earlyBirds,
    customerNumber: response?.customerDetailsResponse?.customerNumber,
    registrationStatus: response?.registrationStatus,
   });
  },
 });

 ///? Run on Page Load
 useEffect(async () => {
  await userMutation.mutate();
  //? Finding User IP Address
  let location = { query: '00.000.0.000' };
  try {
   const response = await axios.get('http://ip-api.com/json');
   location = response.data;
  } catch (error) {
   console.log('Ad Blocker is Enabled');
  }

  //? Check user subscription
  const subscription = await axios.get(
   `${API_URL.REVENUE}/customer/findSubscriptionByCustomer/${user.customerNumber}`
  );
  let _subscriptions = subscription.data;
  let finalSubscription;

  if (_subscriptions.length > 0) {
   _subscriptions.forEach((subscription, index) => {
    let _subscription = subscription;
    _subscription.dateTime = moment(
     subscription.createdDate.replace('-', '/'),
     'YYYY/MM/DD'
    ).toDate();
    _subscriptions[index] = _subscription;
   });
   finalSubscription = _subscriptions.reduce((a, b) =>
    a.dateTime > b.dateTime ? a : b
   );
  }

  if (finalSubscription) {
   if (finalSubscription.subscriptionStatus === 'ACTIVE') {
    const subscriptionProduct = await axios.get(
     `${API_URL.REVENUE}/product/getById/${finalSubscription.productId}`
    );
    setProduct(subscriptionProduct);
    setProducts([subscriptionProduct]);
    setUserSubscription(finalSubscription);
    setOptions(false);
    setLoading(false);
   }
  }
  //? If no subscription check if he is from pricing page
  if (!userSubscription) {
   const _strapiId = sessionStorage.getItem('strapiId');
   sessionStorage.removeItem('strapiId');
   if (_strapiId) {
    const strapiReq = await axios.get(
     `${API_URL.REVENUE}/product/byStrapiId?strapiId=${_strapiId}`
    );
    setProduct(strapiReq.data);
    setProducts([strapiReq.data]);
    setOptions(false);
    setLoading(false);
   }
  }
  //? Initialize the data
  const home = await axios.get(`${API_URL.CMS}/homepage`);
  setData({ ...home.data, user, location, userSubscription });
 }, []);

 ///? Runs after option is selected
 useEffect(async () => {
  const productsInfo = await axios.get(
   `${API_URL.REVENUE}/product/findActiveProducts`
  );
  const promotion = await axios.get(
   `${API_URL.REVENUE}/customer/findPromotionalByCustomer/${user.customerNumber}`
  );

  let FreeTrial = false;
  let EarlyBird = false;
  const _promotions = promotion.data.promotionalProducts;

  if (_promotions.length > 0) {
   _promotions.array.forEach((product) => {
    if (
     product.promotionType === 'FT' &&
     product.maxNoOfTrials < product.maxUsageReached
    )
     FreeTrial = true;
    if (
     user.earlyBird &&
     product.promotionType === 'EB' &&
     product.maxNoOfTrials < product.maxUsageReached
    )
     EarlyBird = true;
   });
  }

  if (userSubscription) {
   productsInfo.data = productsInfo.data.filter(
    (product) => product.id === userSubscription.productId
   );
  } else {
   if (!EarlyBird)
    productsInfo.data = productsInfo.data.filter(
     (product) => product.promotionType !== 'EB'
    );
   if (!FreeTrial)
    productsInfo.data = productsInfo.data.filter(
     (product) => product.promotionType !== 'FT'
    );
   productsInfo.data = productsInfo.data.filter(
    (product) => product.isSubscription === activeOption1
   );
  }
  setProducts(productsInfo.data);
  setProduct(productsInfo.data[0]);
  setLoading(false);
 }, [selectedType]);

 if (loading) {
  return <Loader />;
 } else if (data && options && !loading) {
  return (
   <div className='centered-plan'>
    <div className='row mt-5'>
     <div className='col-lg-12'>
      <div className='pay_option_text mb-2'>
       <h1 className='ft-14 medium'>{data?.Payment?.payment_option}</h1>
      </div>
     </div>
    </div>
    <div className='plan-payment-option'>
     <div className='row'>
      <div className='col-lg-12'>
       <div
        className={!activeOption1 ? 'pay_option_1 ' : 'pay_option_1 active_box'}
        onClick={() => {
         setActiveOption1(!activeOption1);
         setActiveOption2(false);
        }}
       >
        {activeOption1 ? (
         <div>
          <img src={tick} className='option-tick' alt='...' />
         </div>
        ) : (
         ''
        )}
        <h5 className='black mb-2'>{Home?.Payment?.subscribe_text}</h5>
        <p>{Home?.Payment?.claim_text}</p>
        <h6>{Home?.Payment?.starting_from}</h6>
        <strong className='bigg'>{Home?.Payment?.plan1_price}</strong>
        <span>{Home?.Payment?.plan1_detail}</span>
       </div>
      </div>

      <div className='col-lg-12'>
       <div
        className={!activeOption2 ? 'pay_option_2' : 'pay_option_2 active_box'}
        onClick={() => {
         setActiveOption2(!activeOption2);
         setActiveOption1(false);
        }}
       >
        {activeOption2 ? (
         <div>
          <img src={tick} className='option-tick' alt='...' />
         </div>
        ) : (
         ''
        )}
        <h5 className='black mb-2 widthhh'>{Home?.Payment?.plan2_detail}</h5>
        <strong className='bigg'>{Home?.Payment?.plan2_price}</strong>
       </div>
      </div>
     </div>
    </div>
    <div className='row mt-5 not-row'>
     <div className='col-lg-12'>
      <button
       disabled={!activeOption1 && !activeOption2}
       onClick={() => {
        setOptions(false);
        setSelectedType(true);
       }}
       className='home_form_btn'
      >
       Continue <img src={wArrow} alt='...' />{' '}
      </button>
     </div>
    </div>
   </div>
  );
 } else if (data && !options) {
  if (!transferred && window.location.pathname === '/plan') {
   history.push('/plan/payment-method');
   setTransferred(true);
  }
  return (
   <>
    <div className='plan_section'>
     <SubNav head={data.Payment.select_plan} />
     <div className='plan_hero'>
      <div className='plan_container'>
       <div className='row'>
        <div className='col-lg-6 plan_col'>
         <div className='select_plan'>
          <h2>Select a plan</h2>
          <div>
           <select onChange={(val) => setProduct(products[val.target.value])}>
            {products?.map((product, i) => {
             return <option value={i}>{product.name}</option>;
            })}
           </select>
          </div>
          <div className='row d_p_text p_text mt-4'>
           <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
            <h2>{product.name}</h2>
           </div>
           <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
            <h6 className='fw-bold'> £ {product.price}</h6>
           </div>
          </div>
          <hr />
          <div className='row w-100'>
           <PlanList product={product} />
          </div>
         </div>
        </div>

        <div className='col-lg-6'>
         <div className='plan_content'>
          <Switch>
           <Route>
            <Route
             exact
             path='/plan/payment-method'
             component={() => (
              <PlanPaymentMethod Home={Home} data={data} product={product} />
             )}
            />
            <Route
             exact
             path='/plan/payment-stripe'
             component={() => (
              <PlanStripe Home={Home} data={data} product={product} />
             )}
            />
            <Route
             exact
             path='/plan/payment-paypal'
             component={() => (
              <PlanPaypal Home={Home} data={data} product={product} />
             )}
            />
            <Route
             exact
             path='/plan/payment-thank'
             component={() => (
              <PlanThank Home={Home} data={data} product={product} />
             )}
            />
            <Route
             exact
             path='/plan/payment-failed'
             component={() => <PlanFailed data={data} product={product} />}
            />
           </Route>
          </Switch>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </>
  );
 } else return <Loader />;
};

export default Plan;

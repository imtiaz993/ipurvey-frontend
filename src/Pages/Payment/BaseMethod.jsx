import { useQuery } from 'react-query';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../Context/authContext';
import { API_URL } from '../../Utils/constants';
import BasePaymentMethod from './BasePaymentMethod';
import { home } from '../../Query/queryFunctions';

const BaseMethod = ({
 data,
 refresh,
 proceed,
 setPaymentObjF,
 disabled,
 theData,
}) => {
 const history = useHistory();
 const [userSubscription, setUserSubscription] = useState('');
 const [loading, setLoading] = useState(true);
 const [products, setProducts] = useState([]);
 const [product, setProduct] = useState('');
 const [payment, setPayment] = useState(false);
 const { user } = useAuthContext();
 const { data: Home } = useQuery('home', home, {
  refetchOnWindowFocus: false,
 });
 ///? Run on Page Load
 useEffect(async () => {
  if (sessionStorage.getItem('paypal')) {
   const _PaymentObj = JSON.parse(localStorage.getItem('P_OBJ'));
   const _Product = JSON.parse(localStorage.getItem('Prod'));
   const _ProductList = JSON.parse(localStorage.getItem('ProdL'));
   if (_PaymentObj && _Product && _ProductList) {
    setPaymentObjF(_PaymentObj);
    setProduct(_Product);
    setProducts(_ProductList);
    setPayment(true);
    setLoading(false);
   } else history.push('/travel-claim');
  } else {
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

   const productsInfo = await axios.get(
    `${API_URL.REVENUE}/product/findActiveProducts`
   );
   const promotion = await axios.get(
    `${API_URL.REVENUE}/customer/findPromotionalByCustomer/${user.customerNumber}`
   );

   let FreeTrial = false;
   let EarlyBird = false;
   let _products = productsInfo.data;
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
   } else {
    FreeTrial = true;
   }
   const _travelModel = JSON.parse(localStorage.getItem('travelModel'));
   if (!EarlyBird) {
    _products = _products.filter((product) => product.promotionType !== 'EB');
   }
   if (!FreeTrial) {
    _products = _products.filter((product) => product.promotionType !== 'FT');
   }
   _products = _products.filter(
    (product) =>
     product.category === 'C' || product.category === _travelModel.travel_mode
   );
   _products = _products.filter(
    (product) => product.isSubscription === data?.selectedSubscription
   );
   if (finalSubscription && finalSubscription.subscriptionStatus === 'ACTIVE') {
    setUserSubscription(finalSubscription.productId);
   }
   setProducts(_products);
   setProduct(_products[0]);
   setPaymentObjF({ ...data, user, location });
   setLoading(false);
  }
 }, []);

 useEffect(() => {
  if (product !== '') {
   let travelModel = JSON.parse(localStorage.getItem('travelModel'));
   travelModel.product = product;
   localStorage.setItem('travelModel', JSON.stringify(travelModel));
  }
 }, [product]);

 if (loading) {
  return (
   <div className='base-plan-container r_center'>
    <CircularProgress />
   </div>
  );
 } else {
  return (
   <div>
    <h4 className='paylan_heading ft00 black ml-4 mt-4'>
     {Home?.Payment?.subscribe_text}
    </h4>
    <div className='base-plan-container'>
     <div className='se-row'>
      <div className='the_column'>
       <div className='paylan_container'>
        <div className='select_paylan'>
         <h4 className='paylan_heading'> {Home?.Payment?.select_plan}</h4>
         <div>
          <select onChange={(val) => setProduct(products[val.target.value])}>
           {products?.map((_product, i) => {
            return (
             <option value={i} selected={product.id === _product.id}>
              {_product.name}
             </option>
            );
           })}
          </select>
         </div>
         <div className='row d_p_text p_text mt-4'>
          <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
           <h2>{product.name}</h2>
          </div>
          <div className='col-6 col-sm-6 col-md-6 col-lg-6'>
           <h6 className='fw-bold'>
            £ {userSubscription === product.id ? '0' : product.price}
           </h6>
          </div>
         </div>
         <hr />
        </div>
       </div>
       <div className='Summary-thingy'>
        <div className='row mb-3'>
         <div className='col-lg-12'>
          <div className='paylsum_heading ml-2 mt-1'>
           <span>{Home?.Payment?.order_summary}</span>
          </div>
         </div>
         <div className='col-lg-12'>
          <div className='tr_details_2'>
           <div>
            <span className='black'>Single Claim Initiation Fee</span>
            <span className='black'>
             {userSubscription === product.id ? '0' : product.price}
            </span>
           </div>
           <hr />
           <div>
            <span className='black'>{Home?.Payment?.order_summary}</span>
            <span className='black'>
             {userSubscription === product.id ? '0' : product.price}
            </span>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
      <div className='col-lg-6'>
       <div className='plan_content'>
        <BasePaymentMethod
         madePayment={payment}
         theData={theData}
         data={data}
         disabled={disabled}
         product={product}
         refresh={refresh}
         proceed={proceed}
         proceedC={() => {
          proceed();
          proceed();
         }}
         productL={products}
         subscribed={userSubscription === product.id}
        />
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 }
};

export default BaseMethod;

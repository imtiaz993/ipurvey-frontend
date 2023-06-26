import axios from 'axios';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Loader from '../../Components/Loader';
import { useAuthContext } from '../../Context/authContext';
import { features, plans } from '../../Query/queryFunctions';
import { API_URL } from '../../Utils/constants';
import OurPlanComp from './OurPlanComp';

const getLatestDateObject = (subscriptionArray) => {
 const latestDateObject = subscriptionArray
  .map(function (e) {
   return e;
  })
  .sort()
  .reverse()[0];
 return latestDateObject?.subscriptionStatus === 'ACTIVE'
  ? latestDateObject
  : null;
};

const OurPlans = () => {
 const getPromotinalByCustomer = async (customerRefrence) => {
  const response = await axios.get(
   `${API_URL.RDS}/customer/findPromotionalByCustomer/${customerRefrence}`
  );
  return response?.data;
 };

 const geSubscriptionByCustomer = async (customerRefrence) => {
  const response = await axios.get(
   `${API_URL.RDS}/customer/findSubscriptionByCustomer/${customerRefrence}`
  );
  return response?.data;
 };

 const getproductByProductId = async (productId) => {
  const response = await axios.get(
   `${API_URL.RDS}/product/getById/${productId}`
  );
  return response?.data;
 };

 const { user } = useAuthContext();
 const [activePlanId, setActivePlanId] = useState(null);

 const CheckActivePlan = async () => {
  if (user.isAuthenticated) {
   const promotionalData = await getPromotinalByCustomer(user?.customerNumber);
   if (!promotionalData?.promotionalProducts.length) {
    const subscriptionData = await geSubscriptionByCustomer(
     promotionalData?.customerReference
    );
    if (subscriptionData.length !== 0) {
     const activeProduct = await getproductByProductId(
      getLatestDateObject(subscriptionData)?.productId
     );
     if (activeProduct) {
      setActivePlanId(activeProduct?.strapiId);
     }
    }
   } else {
    if (
     promotionalData?.promotionalProducts[0].promotionType === 'FT' &&
     !promotionalData?.promotionalProducts[0].maxUsageReached
    ) {
     setActivePlanId(promotionalData?.promotionalProducts[0]?.productId);
    }
   }
  }
 };

 useEffect(() => {
  CheckActivePlan();
 }, []);

 const { data: Features } = useQuery('features', features, {
  refetchOnWindowFocus: false,
 });
 const { data: Plans } = useQuery('plans', plans, {
  refetchOnWindowFocus: false,
 });

 if (Features && Plans) {
  return (
   <OurPlanComp plans={Plans} features={Features} activePlanId={activePlanId} />
  );
 } else return <Loader />;
};

export default OurPlans;

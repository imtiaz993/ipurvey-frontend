import http from '../Service/http';

const apiEndpoints = {
 auth: {
  signup: '/auth/signup',
  login: '/auth/login',
  refreshToken: '/auth/refreshToken',
  resetPassword: '/auth/resetPassword',
  resetPasswordEmail: '/auth/resetPasswordEmail',
  registrationConfirm: '/auth/registrationConfirm',
  resendVerificationEmail: '/auth/resendVerificationEmail',
 },
 user: {
  getUserData: '/user/me',
  getAddressByPostCode: '/user/getAddressByPostcode',
  completeRegistraion: '/user/completeRegistration',
  updateRegistrationStatus: '/user/updateRegistrationStatus',
  submitFeedback: '/user/submitFeedback',
  communicationPreferences: '/user/communicationPreferences',
  changePassword: '/user/changePassword',
  useractivity: '/user/useractivity',
  update: '/user/UpdateCustomerDetails',
 },
 travel: {
  travelClaim: '/orchestrator/flight/booking/requests/oneAndThree',
 },
 pub: {
  getInTouch: '/public/mail/contactMe',
  publicFeedback: '/public/publicFeedback',
 },
 cms: {
  home: '/homepage',
  layout: '/layout',
  documentation: '/api-doc',
  blogs: '/blogs',
  blogsPage: '/blogs-page',
  career: '/career',
  contact: '/contact-page',
  dashboard: '/dashoard',
  developers: '/developers',
  features: '/features',
  partners: '/partners',
  privacy: '/privacy-policy',
  about: '/about-us',
  terms: '/terms',
  blog: '/blogs',
  faq: '/faq',
  services: '/services',
  plans: '/plans',
 },
};

const { auth, user, travel, pub, cms } = apiEndpoints;

export const login = (payload) => http.post(auth.login, payload);
export const refreshToken = (payload) => http.post(auth.refreshToken, payload);
export const registration = (payload) => http.post(auth.signup, payload);
export const registrationConfirm = (payload) =>
 http.get(`${auth.registrationConfirm}?token=${payload}`);
export const resendVerificationEmail = (payload) =>
 http.post(`${auth.resendVerificationEmail}?email=${payload}`);
export const getUserData = () => http.get(user.getUserData);
export const useractivity = () =>
 http.get(`${user.useractivity}?page=1&size=50`);
export const findAddress = (payload) =>
 http.get(`${user.getAddressByPostCode}?postcode=${payload}`);
export const communicationPreferences = (payload) =>
 http.post(user.communicationPreferences, payload);
export const changePassword = (payload) =>
 http.post(user.changePassword, payload);
export const resetPasswordEmail = (payload) =>
 http.post(auth.resetPasswordEmail, payload);
export const resetPassword = (payload) =>
 http.post(auth.resetPassword, payload);
export const submitFeedback = (payload) =>
 http.post(user.submitFeedback, payload);
export const completeRegistration = (payload) =>
 http.post(user.completeRegistraion, payload);
export const updateRegistrationStatus = (payload) =>
 http.post(
  `${user.updateRegistrationStatus}?status=${payload.status}&statusChangeReason=${payload.statusChangeReason}`
 );
export const travelClaim = (payload) => http.post(travel.travelClaim, payload);
export const getInTouchData = (payload) => http.post(pub.getInTouch, payload);
export const publicFeedback = (payload) =>
 http.post(pub.publicFeedback, payload);
export const update = (payload) => http.post(user.update, payload);
//Strapi
export const blog = (id) => http.cms(`${cms.blog}/${id}`);
export const developers = () => http.cms(cms.developers);
export const blogpage = () => http.cms(cms.blogsPage);
export const blogs = () => http.cms(cms.blogs);
export const career = () => http.cms(cms.career);
export const contact = () => http.cms(cms.contact);
export const dashboard = () => http.cms(cms.dashboard);
export const documentation = () => http.cms(cms.documentation);
export const faq = () => http.cms(cms.faq);
export const features = () => http.cms(cms.features);
export const home = () => http.cms(cms.home);
export const layout = () => http.cms(cms.layout);
export const partners = () => http.cms(cms.partners);
export const plans = () => http.cms(cms.plans);
export const privacy = () => http.cms(cms.privacy);
export const services = () => http.cms(cms.services);
export const terms = () => http.cms(cms.terms);
export const about = () => http.cms(cms.about);

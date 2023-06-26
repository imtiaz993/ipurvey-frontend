let _URLS = {
 UMS: 'https://dev-ilekun-ipv.ipurvey.com',
 RDS: 'https://dev-ilekun-ipv.ipurvey.com',
 DCR: 'https://dev-ilekun-ipv.ipurvey.com',
 OCH: 'https://dev-ilekun-ipv.ipurvey.com',
 REVENUE: 'https://dev-ilekun-ipv.ipurvey.com',
 CMS: 'http://localhost:1338',
};

// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//  _URLS = {
//   UMS: 'https://dev-api-ums.ipurvey.com',
//   RDS: 'https://dev-api-rds.ipurvey.com',
//   DCR: 'https://dev-api-dcr.ipurvey.com',
//   OCH: 'https://dev-api-och.ipurvey.com',
//   REVENUE: 'https://dev-api-revenue.ipurvey.com',
//   CMS: 'https://staging-cms.ipurvey.com',
//  };
// }

export const API_URL = _URLS;

// config.js
// API Base URL - automatically uses .env.development or .env.production
const getBaseURL = () => {
  return process.env.REACT_APP_API_URL || 'http://localhost:8080';
};

export default getBaseURL;
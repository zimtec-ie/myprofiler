// config.js
// Environment mode: 'local' or 'remote'
const envMode = process.env.REACT_APP_ENV_MODE || 'local';

const getBaseURL = () => {
  if (envMode === 'remote') {
    return process.env.REACT_APP_API_URL_REMOTE || 'http://86.42.207.54:8080';
  }
  return process.env.REACT_APP_API_URL_LOCAL || 'http://localhost:8080';
};

export default getBaseURL;
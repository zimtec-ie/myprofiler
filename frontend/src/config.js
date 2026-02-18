// config.js
// Environment mode: 'local' or 'remote'
const envMode = process.env.REACT_APP_ENV_MODE || 'local';

const getBaseURL = () => {
  if (envMode === 'remote') {
    if (!process.env.REACT_APP_API_URL_REMOTE) {
      throw new Error('REACT_APP_API_URL_REMOTE not set in .env file');
    }
    return process.env.REACT_APP_API_URL_REMOTE;
  }
  
  if (!process.env.REACT_APP_API_URL_LOCAL) {
    throw new Error('REACT_APP_API_URL_LOCAL not set in .env file');
  }
  return process.env.REACT_APP_API_URL_LOCAL;
};

export default getBaseURL;
const devServerUrl = 'http://localhost:3000';
const prodServerUrl = 'https://kurentochat-pk.staging.forasoft.com';

export default (import.meta.env.PROD ? prodServerUrl : devServerUrl);
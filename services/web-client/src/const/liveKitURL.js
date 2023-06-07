const devLiveKitUrl = 'ws://localhost:7880';
const prodLiveKitUrl = 'wss://kurentochat-pk.staging.forasoft.com';

export default (import.meta.env.PROD ? prodLiveKitUrl : devLiveKitUrl);
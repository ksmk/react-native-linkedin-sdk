import {
  NativeModules,
} from 'react-native';


const {
  RNLinkedInSessionManager,
} = NativeModules;


const LinkedInSDK = {
  initSession(config) {
    return RNLinkedInSessionManager.initSession(config);
  },
  signIn(config) {
    return LinkedInSDK.initSession(config)
      .then(LinkedInSDK.normalizeToken);
  },
  normalizeToken({expiresOn, ...token}) {
    return {
      expiresOn: new Date(expiresOn),
      ...token,
    };
  },
  getRequest(url) {
    return RNLinkedInSessionManager.getRequest(url)
      .then(({
        status,
        data,
      }) => ({
        status,
        data: JSON.parse(data),
      }));
  },
};

export default LinkedInSDK;